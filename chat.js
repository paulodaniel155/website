const pedroSelectorBtn = document.querySelector('#pedro-selector');
const pauloSelectorBtn = document.querySelector('#paulo-selector');
const chatHeader = document.querySelector('.chat-header');
const chatMessages = document.querySelector('.chat-messages');
const chatInputForm = document.querySelector('.chat-input-form');
const chatInput = document.querySelector('.chat-input');
const clearChatBtn = document.querySelector('.clear-chat-button');

const messages = JSON.parse(localStorage.getItem('messages')) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'Pedro' ? 'blue-bg' : 'gray-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = 'Pedro';

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} está conversando...`;
  chatInput.placeholder = `Digite algo, ${messageSender}...`;

if (name === 'Pedro') {
    pedroSelectorBtn.classList.add('active-person');
    pauloSelectorBtn.classList.remove('active-person');
}

if (name === 'Paulo') {
    pauloSelectorBtn.classList.add('active-person');
    pedroSelectorBtn.classList.remove('active-person');
}


chatInput.focus();
};

pedroSelectorBtn.onclick = () => updateMessageSender('Pedro');
pauloSelectorBtn.onclick = () => updateMessageSender('Paulo');

const sendMessage = (e) => {
  e.preventDefault();

const timestamp = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

messages.push(message);
localStorage.setItem('messages', JSON.stringify(messages));

chatMessages.innerHTML += createChatMessageElement(message);

chatInputForm.reset();

chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener('submit', sendMessage);

clearChatBtn.addEventListener('click', () => {
  localStorage.clear();
  chatMessages.innerHTML = '';
});
