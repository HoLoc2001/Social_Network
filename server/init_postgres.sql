CREATE DATABASE social;
CREATE EXTENSION "pgcrypto";
CREATE EXTENSION "unaccent";

CREATE TABLE users(
    user_id UUID DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender CHAR(1) CHECK(gender in ('F','M')),
    birthday DATE NOT NULL,
    city VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

CREATE TABLE posts(
    post_id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    post_content TEXT,
    images TEXT [],
    total_like INTEGER DEFAULT 0,
    list_like TEXT [],
    total_comment INTEGER DEFAULT 0,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (post_id)
);

CREATE TABLE post_like(
    post_id UUID NOT NULL REFERENCES posts(post_id),
    user_id UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (post_id, user_id)
);

CREATE TABLE post_comments(
    comment_id UUID DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL REFERENCES posts(post_id),
    user_id UUID NOT NULL REFERENCES users(user_id),
    comment_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (comment_id)
);

CREATE TABLE follower(
    user_id UUID NOT NULL REFERENCES users(user_id),
    follower_id UUID NOT NULL REFERENCES users(user_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (user_id, follower_id)
);

CREATE TABLE refresh_tokens(
    refresh_token TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES users(user_id),
    PRIMARY KEY (refresh_token, user_id)
);

CREATE UNIQUE INDEX idx_email ON users (email);
CREATE UNIQUE INDEX idx_post ON posts (post_id);
CREATE INDEX idx_post_tsv ON posts USING GIN(posts_tsv);
CREATE INDEX idx_user_tsv ON users USING GIN(users_tsv);

CREATE INDEX idx_post_comment ON post_comments (post_id);
CREATE INDEX idx_follower ON follower (user_id, follower_id);
CREATE INDEX idx_post_like ON post_like (post_id);
CREATE INDEX idx_refresh_token ON refresh_tokens (refresh_token, user_id);

CREATE OR REPLACE FUNCTION users_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN 
NEW.users_tsv =	setweight(to_tsvector(coalesce(unaccent(NEW.last_name))), 'A') ||
setweight(to_tsvector(coalesce(unaccent(NEW.first_name))), 'B');
RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION posts_tsv_trigger_func()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.posts_tsv =
	setweight(to_tsvector(coalesce(unaccent(NEW.post_content))), 'A');
RETURN NEW;
END $$;

CREATE TRIGGER users_tsv_trigger BEFORE INSERT OR UPDATE
OF first_name ON users FOR EACH ROW
EXECUTE PROCEDURE users_tsv_trigger_func();

CREATE TRIGGER posts_tsv_trigger BEFORE INSERT OR UPDATE
OF post_content ON posts FOR EACH ROW
EXECUTE PROCEDURE posts_tsv_trigger_func();