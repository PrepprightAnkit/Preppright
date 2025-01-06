import React, { useEffect, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const questions = [
    { key: 'name', question: "Hi there! 👋 I'm your AI assistant. What's your name?" },
    { key: 'email', question: "Great to meet you! What's your email address?" },
    { key: 'mobile', question: "Thanks! Could I get your mobile number?" },
    { key: 'college', question: "Which college do you attend?" },
    { key: 'query', question: "How can I help you today?" }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const initialX = windowWidth - 100;
    const initialY = windowHeight - 100;
    setPosition({ x: initialX, y: initialY });
    
    if (isOpen) {
      setPosition({ x: windowWidth - 420, y: windowHeight - 600 });
      if (messages.length === 0) {
        simulateTyping(questions[0].question);
      }
    } else {
      setPosition({ x: initialX, y: initialY });
    }

    const handleResize = () => {
      if (isOpen) {
        setPosition({ x: window.innerWidth - 420, y: window.innerHeight - 600 });
      } else {
        setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, messages.length]);

  const simulateTyping = async (message) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessages(prev => [...prev, { type: 'bot', content: message }]);
    setIsTyping(false);
  };

  const handleUserInput = async () => {
    if (!currentInput.trim()) return;
    
    const userMessage = { type: 'user', content: currentInput };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    
    setUserData(prev => ({ ...prev, [questions[currentStep].key]: currentInput }));
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      await simulateTyping(questions[currentStep + 1].question);
    } else {
      await simulateTyping("Thanks for chatting! I'll get back to you soon. 😊");
      console.log('Submitted data:', { ...userData, [questions[currentStep].key]: currentInput });
    }
  };

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleDrag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg cursor-move transition-all duration-200 hover:scale-110"
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col">
          <div className="bg-blue-500 p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">Chat Support</h3>
            <button
              onClick={() => {
                setIsOpen(false);
                setMessages([]);
                setCurrentStep(0);
                setUserData({});
              }}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white text-gray-800 shadow-md rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-md rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
                className="flex-1 p-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message..."
              />
              <button
                onClick={handleUserInput}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;