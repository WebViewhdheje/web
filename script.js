// تحديد العناصر من HTML
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// إضافة حدث عند الضغط على زر "إرسال"
sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    // الحصول على النص من حقل الإدخال
    const messageText = messageInput.value;

    if (messageText.trim() !== "") {
        // إنشاء عنصر جديد للرسالة
        const messageElement = document.createElement('p');
        messageElement.textContent = messageText;

        // إضافة الرسالة إلى صندوق الدردشة
        chatBox.appendChild(messageElement);

        // مسح حقل الإدخال
        messageInput.value = '';

        // التمرير إلى أسفل صندوق الدردشة
        chatBox.scrollTop = chatBox.scrollHeight;

        // حفظ الرسالة في LocalStorage
        saveMessage(messageText);
    }
}

// تخزين الرسائل في LocalStorage
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// استرجاع الرسائل من LocalStorage عند تحميل الصفحة
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(function(message) {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);
    });

    chatBox.scrollTop = chatBox.scrollHeight;
}

// تحميل الرسائل عند تحميل الصفحة
window.onload = loadMessages;