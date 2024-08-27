fetch('pass/ngrok_url.txt') 
    .then(response => response.text())
    .then(ngrokUrl => {
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

            // Send message to server using the fetched Ngrok URL
            fetch(`${ngrokUrl}/get_answer1`, {  // Adjust the endpoint if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product: 'product2',
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
    })
    .catch(error => console.error('Error fetching Ngrok URL:', error));
