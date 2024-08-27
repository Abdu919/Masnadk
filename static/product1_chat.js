const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Display user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('user-message');
    userMessageDiv.textContent = message;
    chatLog.appendChild(userMessageDiv);

    // Clear input
    userInput.value = '';

    // Send message to server (replace with your actual Ngrok URL)
    fetch('https://<your-ngrok-url>/get_answer', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: 'product1',
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('bot-message');
        botMessageDiv.textContent = data.answer;
        chatLog.appendChild(botMessageDiv);

        // Scroll to bottom
        chatLog.scrollTop = chatLog.scrollHeight;
    });
}
