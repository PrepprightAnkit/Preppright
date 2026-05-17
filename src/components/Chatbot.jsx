import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🙏 I'm PreppRight Assistant. How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pulse, setPulse] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
      setTimeout(() => inputRef.current?.focus(), 400);
      setPulse(false);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const courseMapping = {
    "Web Development": "full-stack-web-development",
    "Data Science": "data-science-roadmap",
    "Java Programming": "java-programming",
    "Digital Marketing": "digital-marketing",
    "Python": "python-mastery",
    "AI & ML": "ai-ml-python",
    "Cybersecurity": "cybersecurity-fundamentals",
  };

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const selectedCourseId = courseMapping[text];

    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      let suggestions = [];
      const lowerText = text.toLowerCase();

      if (selectedCourseId) {
        botResponse = `Excellent choice! "${text}" is a great program. I'm redirecting you to the course details now... 🚀`;
        
        setTimeout(() => {
          navigate(`/course/${selectedCourseId}`);
          setIsOpen(false);
        }, 1500);

      } else if (text === "View All Courses") {
        botResponse = "Taking you to our full course catalog! Happy learning! 🎓";
        setTimeout(() => {
          navigate("/courses");
          setIsOpen(false);
        }, 1500);
      } else if (lowerText.includes("course") || lowerText.includes("learn") || lowerText.includes("study")) {
        botResponse = "We offer industry-leading programs. Which one would you like to explore?";
        suggestions = ["Web Development", "Data Science", "Java Programming", "Digital Marketing", "AI & ML"];
      } else if (lowerText.includes("price") || lowerText.includes("fee") || lowerText.includes("cost")) {
        botResponse = "Our courses are very affordable, starting from ₹6,000. Want to see all of them?";
        suggestions = ["View All Courses", "Web Development", "Java Programming"];
      } else if (lowerText.includes("contact") || lowerText.includes("call") || lowerText.includes("support")) {
        botResponse = "You can reach us at +91 1234567890. Redirecting you to our contact page...";
        setTimeout(() => {
          navigate("/contact");
          setIsOpen(false);
        }, 2000);
      } else if (lowerText.includes("placement") || lowerText.includes("job") || lowerText.includes("career")) {
        botResponse = "We offer 100% placement support! Many of our students work at Top MNCs.";
        suggestions = ["Web Development", "Data Science", "Digital Marketing"];
      } else {
        botResponse = "I'm here to help you find the best course for your career. Would you like to see our top-rated programs?";
        suggestions = ["Java Programming", "Web Development", "Data Science"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions,
        },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const quickReplies = [
    { label: "📚 Courses", action: "Tell me about your courses" },
    { label: "💰 Pricing", action: "What is the course fee?" },
    { label: "🏆 Placement", action: "Do you offer jobs?" },
    { label: "📞 Contact", action: "How to contact you?" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUpIn {
          from { opacity:0; transform:translateY(16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes fadeUpOut {
          from { opacity:1; transform:translateY(0) scale(1); }
          to   { opacity:0; transform:translateY(16px) scale(0.97); }
        }
        @keyframes slideIn {
          from { opacity:0; transform:translateY(12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes bounceRing {
          0%,100%{ transform:scale(1); box-shadow:0 0 0 0 rgba(99,102,241,0.6); }
          50%    { transform:scale(1.06); box-shadow:0 0 0 10px rgba(99,102,241,0); }
        }
        @keyframes dot1 { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes dot2 { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        @keyframes dot3 { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        .sg-dot1{animation:dot1 1.4s infinite ease-in-out;}
        .sg-dot2{animation:dot2 1.4s infinite ease-in-out 0.2s;}
        .sg-dot3{animation:dot3 1.4s infinite ease-in-out 0.4s;}
        .sg-chat-open  { animation: fadeUpIn  0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .sg-chat-close { animation: fadeUpOut 0.25s ease both; }
        .sg-msg-in  { animation: slideIn 0.3s ease both; }
        .sg-sug-btn:hover { background:rgba(99,102,241,0.18)!important; border-color:rgba(99,102,241,0.5)!important; color:#818cf8!important; transform:translateY(-1px); }
        .sg-quick-btn:hover { background:rgba(99,102,241,0.08)!important; border-color:rgba(99,102,241,0.25)!important; color:#6366f1!important; }
        .sg-send-btn:hover { background:linear-gradient(135deg,#818cf8,#4f46e5)!important; transform:scale(1.06); box-shadow:0 6px 18px rgba(99,102,241,0.45)!important; }
        .sg-toggle-btn:hover { transform:scale(1.1) rotate(5deg)!important; }
        .sg-toggle-btn:active { transform:scale(0.92)!important; }
        .sg-input:focus { border-color:rgba(99,102,241,0.4)!important; background:rgba(99,102,241,0.04)!important; }
        ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.2);border-radius:4px}
        @media(max-width:480px){
          .sg-chatwin{ width:calc(100vw - 40px)!important; right:-10px!important; }
        }
      `}</style>

      <div style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 10000, fontFamily: "'DM Sans', sans-serif" }}>

        {/* Chat Window */}
        {isOpen && (
          <div
            className={isVisible ? "sg-chatwin sg-chat-open" : "sg-chatwin sg-chat-close"}
            style={{
              position: "absolute",
              bottom: "70px",
              right: "0",
              width: "320px",
              height: "480px",
              background: "linear-gradient(160deg, #0f172a 0%, #0a0f1e 100%)",
              backdropFilter: "blur(24px)",
              borderRadius: "20px",
              border: "1px solid rgba(99,102,241,0.2)",
              boxShadow: "0 32px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "16px 18px",
              background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(99,102,241,0.03))",
              borderBottom: "1px solid rgba(99,102,241,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}>
              {/* Avatar */}
              <div style={{
                width: "36px", height: "36px",
                borderRadius: "10px",
                background: "rgba(255,255,255,1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                flexShrink: 0,
                overflow: "hidden",
                padding: "4px"
              }}>
                <img 
                  src="/images/PreepPright-Yv6Az5Se.png" 
                  alt="Assistant" 
                  style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ color: "#f8fafc", fontSize: "0.875rem", fontWeight: 700, lineHeight: 1.2 }}>PreppRight Assistant</div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
                  <span style={{ fontSize: "0.65rem", color: "#94a3b8", letterSpacing: "0.04em" }}>Always Online</span>
                </div>
              </div>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: "28px", height: "28px",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#94a3b8",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "all 0.2s",
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              style={{
                flex: 1,
                padding: "16px 14px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                scrollbarWidth: "thin",
              }}
            >
              {messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className="sg-msg-in"
                  style={{
                    alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                    maxWidth: "85%",
                    animationDelay: `${idx * 0.03}s`,
                  }}
                >
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: msg.sender === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    background: msg.sender === "user"
                      ? "linear-gradient(135deg, #6366f1, #4f46e5)"
                      : "rgba(255,255,255,0.04)",
                    border: msg.sender === "user" ? "none" : "1px solid rgba(255,255,255,0.07)",
                    color: "white",
                    fontSize: "0.8rem",
                    lineHeight: 1.5,
                    boxShadow: msg.sender === "user" ? "0 4px 14px rgba(99,102,241,0.3)" : "none",
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: "0.65rem",
                    color: "#64748b",
                    marginTop: "4px",
                    textAlign: msg.sender === "user" ? "right" : "left",
                  }}>
                    {msg.time}
                  </div>

                  {msg.suggestions && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "8px" }}>
                      {msg.suggestions.map((s, i) => (
                        <button
                          key={i}
                          className="sg-sug-btn"
                          onClick={() => handleSend(s)}
                          style={{
                            padding: "4px 10px",
                            borderRadius: "100px",
                            background: "rgba(99,102,241,0.08)",
                            border: "1px solid rgba(99,102,241,0.25)",
                            color: "#a5b4fc",
                            fontSize: "0.7rem",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            fontFamily: "'DM Sans', sans-serif",
                            fontWeight: 500,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    padding: "10px 14px",
                    borderRadius: "16px 16px 16px 4px",
                    display: "flex",
                    gap: "4px",
                  }}>
                    {[0,1,2].map(i => (
                      <div key={i} className={`sg-dot${i+1}`} style={{
                        width: "6px", height: "6px",
                        borderRadius: "50%",
                        background: "#6366f1",
                        opacity: 0.4,
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            {messages.length < 5 && (
              <div style={{
                padding: "0 12px 8px",
                display: "flex",
                gap: "6px",
                overflowX: "auto",
                scrollbarWidth: "none",
              }}>
                {quickReplies.map((q, i) => (
                  <button
                    key={i}
                    className="sg-quick-btn"
                    onClick={() => handleSend(q.action)}
                    style={{
                      whiteSpace: "nowrap",
                      padding: "6px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#94a3b8",
                      fontSize: "0.7rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      flexShrink: 0,
                    }}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Divider */}
            <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)", margin: "0 12px" }} />

            {/* Input */}
            <div style={{ padding: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                className="sg-input"
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "10px 14px",
                  color: "#f8fafc",
                  outline: "none",
                  fontSize: "0.8rem",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              />
              <button
                className="sg-send-btn"
                onClick={() => handleSend()}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                  border: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                  boxShadow: "0 4px 12px rgba(99,102,241,0.3)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>

            {/* Footer Branding */}
            <div style={{ textAlign: "center", padding: "0 0 10px", color: "#475569", fontSize: "0.6rem", letterSpacing: "0.06em" }}>
              Powered by PreppRight IT Technologies
            </div>
          </div>
        )}

        {/* Toggle FAB */}
        <button
          className="sg-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: isOpen
              ? "linear-gradient(135deg, #1e293b, #0f172a)"
              : "linear-gradient(135deg, #6366f1, #4f46e5)",
            border: isOpen ? "1px solid rgba(99,102,241,0.3)" : "none",
            boxShadow: isOpen
              ? "0 8px 24px rgba(0,0,0,0.4)"
              : "0 8px 24px rgba(99,102,241,0.4)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOpen ? "#6366f1" : "white",
            fontSize: "1.2rem",
            transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
            animation: pulse ? "bounceRing 2.5s ease-in-out infinite" : "none",
            position: "relative",
          }}
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <>
              💬
              {/* Unread dot */}
              <div style={{
                position: "absolute",
                top: "4px", right: "4px",
                width: "10px", height: "10px",
                borderRadius: "50%",
                background: "#22c55e",
                border: "2px solid #0a0f1e",
                boxShadow: "0 0 6px #22c55e",
              }} />
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Chatbot;
