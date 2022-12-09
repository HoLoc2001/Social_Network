let currentUser = [];

export const connectSocket = (socket) => {
  socket.on("disconnect", () => {
    console.log(`User disconnect id is ${socket.id}`);
  });

  // event on here

  socket.on("chat message", (msg) => {
    console.log(`msg is:::${msg}`);
    _io.emit("chat message", msg);
  });
  _io.emit("notification", "hello may ban");
  _io.emit("notification", "hello 123");
  socket.on("initRoom", ({ id }) => {
    currentUser.push(id);
    console.log(`id: ${id}`);
    console.log(currentUser);
  });
  // _io.emit("notification", "hello may ban");

  // on room..
};
