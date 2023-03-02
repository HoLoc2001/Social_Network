CREATE DATABASE social;
CREATE EXTENSION "pgcrypto";

CREATE TABLE users(
    user_id UUID DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender CHAR(1) CHECK(gender in ('F','M')),
    birthday DATE,
    city VARCHAR(50) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

CREATE TABLE posts(
    post_id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id),
    post_content TEXT,
    media TEXT [],
    total_like INTEGER DEFAULT 0,
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
    PRIMARY KEY (user_id, follower_id)
);

CREATE UNIQUE INDEX idx_email ON users (email);
CREATE INDEX idx_post ON posts (post_id);
CREATE INDEX idx_post_comment ON post_comments (post_id);
CREATE INDEX idx_follower ON follower (user_id, follower_id);
CREATE INDEX idx_post_like ON post_like (post_id);