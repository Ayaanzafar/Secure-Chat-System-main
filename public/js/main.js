const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
const fileForm = document.getElementById('file-form');
// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
console.log(username, room);
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
socket.on('urldone', (message) => {
  outputUrlMessage(message);
})
// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }
  var len = msg.length;
  if (msg.slice(len - 3) === 'url') {
    console.log('yes');
    socket.emit('urlmsg',msg);
  } else {
    // Emit message to server
    socket.emit('chatMessage', msg);
  }

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});
fileForm.addEventListener('submit', (e) => {
  e.preventDefault();
})
// Output message to DOM
function outputMessage (message) {
  var text = message.text
  var msg = text.split('')
  var len = msg.length
  let key = 'P'
  let i = 0
  for (i = 0; i < len; i++) {
    msg[i] = (String.fromCharCode((msg[i].charCodeAt(0)) ^ key.charCodeAt(0)))
  }
  let final = msg.join('')
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerHTML += `<div class="msg-box">
  <div class="message">
  <p class="meta">${message.username}<span class="text">&emsp;${message.time}</span></p>
  <p>${final}</p>
  </div>
</div>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}
function outputUrlMessage (message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerHTML += `<div class="msg-box">
  <div class="message">
  <p class="meta">${message.username}<span class="text">&emsp;${message.time}</span></p>
  <p><a href=${message.text} style="color: white;" target="_blank">File</a></p>
  </div>
</div>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}
// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = ` 
  ${users.map(user => `<li class="channel-list__header__text-content" style=" margin-right: 20px; list-style-type: none;">${user.username}</li>`).join('')}`;
  users.forEach((user) => {
    const li = document.createElement('li');
    userList.appendChild(li);
  });
}

//Prompt the user before leave chat room
document.getElementById('logout').addEventListener('click', () => {
  const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});

