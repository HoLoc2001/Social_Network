let currentUser = {};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

const connectSocket = (socket) => {
  socket.on("disconnect", () => {
    delete currentUser[getKeyByValue(currentUser, socket.id)];
    console.log(`User disconnect id is ${socket.id}`);
  });

  socket.on("chat message", (msg) => {
    console.log(`msg is:::${msg}`);
    _io.emit("chat message", msg);
  });

  _io.emit("notification", "hello may ban");

  socket.on("initRoom", ({ id }) => {
    if (id) {
      currentUser[id] = socket.id;
      socket.join(currentUser[id]);
    }
  });
};

const notificationAddPost = ({ listUser, data }) => {
  listUser.forEach((element) => {
    if (currentUser[element]) {
      _io.to(currentUser[element]).emit("notification-addPost", { data });
    }
  });
};

const notificationLikePost = ({ data }) => {
  _io.emit("notification-addPost", { data });
};

module.exports = {
  connectSocket,
  notificationAddPost,
  notificationLikePost,
};
