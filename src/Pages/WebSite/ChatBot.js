import { useEffect, useRef, useState } from "react";
import "../../CSS/ChatBot.css";
import axios from "axios";
import { BaseUrl, CHATBOT } from "../../Api/Api";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import ChatLoading from "../../Components/WebSite/ChatLoading";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";

export default function ChatBot() {
  const cookie = Cookie();

  const user = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof user === "string") {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof user === "object" && user !== null) {
    parsedUser = user; // إذا كان بالفعل كائن، استخدمه كما هو
  }
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  console.log(input);

  const messagesEndRef = useRef(null);

  // ✅ اجعل البوكس ينزل تلقائيًا لآخر رسالة
  useEffect(() => {
    // ✅ اسحب داخل chat-box فقط، بدون التأثير على الصفحة كاملة
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);
  async function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { type: "user", text: input };
    const loadingMessage = { type: "bot", text: "__loading__" }; // مؤشر مؤقت

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");

    try {
      const res = await axios.post(
        `${BaseUrl}/${CHATBOT}`,
        {
          messages: [{ content: input }],
        },
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        }
      );

      const botReply = res.data.response || "🤖 No response from bot.";

      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== "__loading__"),
        { type: "bot", text: botReply },
      ]);
    } catch (err) {
      console.error("❌ API Error:", err);

      setMessages((prev) => [
        ...prev.filter((msg) => msg.text !== "__loading__"),
        { type: "bot", text: "❌ Failed to get response." },
      ]);
    }
  }

  return (
    <>
      <Header />
      <div className="chat-bot bg-section">
        <div className="main-container">
          <div className="title">
            <h2>Chat Bot</h2>
            <p>A chatbot is an AI that assists through conversation.</p>
          </div>
          {messages.length !== 0 ? (
            <div className="chat-box hide-scrollbar">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type} `}>
                  {msg.type === "bot" && msg.text !== "__loading__" && (
                    <FontAwesomeIcon icon={faRobot} />
                  )}
                  {msg.type === "user" && <FontAwesomeIcon icon={faUser} />}
                  {msg.text === "__loading__" ? (
                    <ChatLoading />
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            ""
          )}

          <div className="chat-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="What can I help you?"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
