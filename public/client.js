const socket = io();
let name;
var textarea = document.querySelector("#textarea");  
let messageArea = document.querySelector(".message-area");

do {
  name = prompt("please Enter your name:");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    // console.log("hello moto");
  }
});

// for creating a message via server

function sendMessage(message) {
  let msg = {
    user: name,
    message: message,
  };

  //  after that we will use append for showing the box what to do enter using queryselector

  appendMessage(msg, "outgoing");
textarea.value= ''
scrollToBottom()
  //   send to the server

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let classNmae = type;
  mainDiv.classList.add(classNmae, "message");

  let markup = `
  <h4>${msg.user}</h4>
  <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// receieve message

socket.on('message' ,(msg)=>{
    // console.log(msg);
    appendMessage(msg ,'incoming')
    scrollToBottom()
})

function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}