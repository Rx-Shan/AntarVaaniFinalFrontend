import { useEffect, useState } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [answers, setAnswers] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [initialMessage, setInitialMessage] = useState('');

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('mentalHealthAnswers')) || {};
    setAnswers(savedAnswers);

    // Initial message request to backend (optional if already loaded from /submit page)
    fetch('${import.meta.env.VITE_API_BASE_URL}/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers: Object.values(savedAnswers) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInitialMessage(data.initial_message);
        setChatHistory(data.chat_history);
        setMessages(
          data.chat_history.map((entry) => ({
            sender: entry[0] === 'User' ? 'user' : 'bot',
            text: entry[1],
          }))
        );
      });
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    const updatedHistory = [...chatHistory, ['User', input]];

    fetch('${import.meta.env.VITE_API_BASE_URL}/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_input: input,
        history: chatHistory,
        initial_msg: initialMessage,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newHistory = data.chat_history;
        const botReply = newHistory[newHistory.length - 1][1];

        setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
        setChatHistory(newHistory);
      })
      .catch((err) => {
        console.error("Backend error:", err);
        setMessages((prev) => [
          ...prev,
          { sender: 'bot', text: "Sorry, I couldn't respond right now." },
        ]);
      });
  };

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-b from-green-200 to-yellow-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl border-2 border-purple-300 bg-cyan-300 shadow-lg rounded-lg p-6 flex flex-col h-[80vh]">
        <h2 className="font-serif text-2xl font-bold mb-4 text-sky-800">Mental Health Chatbot</h2>

        <div className="flex-1 overflow-y-auto mb-4 space-y-3 px-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'} px-3`}
            >
              <div
                className={`inline-block max-w-[70%] px-4 py-2 rounded-xl text-left text-black break-words shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 hover:shadow-xl ${
                msg.sender === 'bot'
                  ? 'bg-gradient-to-r from-purple-400 to-pink-200'
                  : 'bg-gradient-to-l from-blue-400 to-cyan-200'
              }`}
              >
              {msg.text}
            </div>
          </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            style={{ backgroundImage: 'linear-gradient(to right, #fff9d1, #fffbe3, #fffdf0)'}}
            className="bg-amber-200 flex-1 border text-black border-amber-500 rounded px-3 py-2 shadow-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            style={{ backgroundColor: '#3b82f6' }}
            className="bg-blue-500 shadow-xl text-white px-4 py-2 rounded transition-transform delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
