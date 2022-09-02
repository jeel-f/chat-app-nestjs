let socket = window.io();
socket.on("connect", () => {
  console.log(socket.connected); // false
  socket.on("chat", (data) => {
    console.log(data);
  })
  socket.on("users", (users) => {
    console.log("Total user", users)
  })
  const token = localStorage.getItem('token');
  socket.emit("join", token);
});
