const socket = io('/chattings');

const getElementById = (id) => document.getElementById(id) || null;

// DOM
const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

// 글로벌 소켓 핸들러
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('new_chat', (data) => {
  const { chat, username } = data;
  drawNewChat(`${username}: ${chat}`);
});
socket.on(`disconnect_user`, (username) => drawNewChat(`${username}: bye...`));

// 이벤트 콜벡
const handleSubmit = (event) => {
  // 새로고침 방지
  event.preventDefault();
  // 작성된 값 불러오기
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    // 그리기
    drawNewChat(`me : ${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

// 닉네임 입력시 상단에 그려주기
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `hello ${username} Stranger : `);
const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  let chatBox;
  if (!isMe)
    chatBox = `
        <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
          ${message}
        </div>
        `;
  else
    chatBox = `
        <div class='bg-white w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>
          ${message}
        </div>
        `;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

// 닉네임 입력 하는 알럿.
function helloUser() {
  const username = prompt('WTF ARE U');
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  // event connect
  formElement.addEventListener('submit', handleSubmit);
}

init();
