const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

// listen to message
socket.on("message", message => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Listen to form submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emmiting a message to a server
  socket.emit("chatMessage", msg);

  // Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to dom
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}.
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
