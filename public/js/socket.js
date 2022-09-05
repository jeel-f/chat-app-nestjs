let socket = window.io();
socket.on("connect", () => {
  socket.on("chat", (data) => {
    if(data && data?.message){
      messageAppendChat(data);
    }
  })
  socket.on("users", (users) => {
    console.log("Total user", users)
  })
  const token = localStorage.getItem('token');
  socket.emit("join", token);
});

const messageAppendChat = (data) => {
  console.log("messageAppendChat ~ data", data)
  const ele = document.getElementById('chat')
  if(ele){
    const side = (data?.reciverId === window.location.href.split('/').at(-1)) ? 'right' : 'left';
    let template = `<div class="${side}">${data.message}</div>`
    ele.innerHTML += template;
  }
}
