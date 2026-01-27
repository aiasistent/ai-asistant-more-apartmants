import { useState, useEffect, useRef } from "react";

export default function Chat({ apartment, lang }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  const apartmentInfo = apartment.info[lang];
  const backgroundImage = apartment.images[lang];

  useEffect(() => {
    setMessages([]);
    setInput("");
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          apartmentInfo: apartmentInfo,
          lang,
        }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();

      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            lang === "sr"
              ? "Došlo je do greške. Pokušajte ponovo."
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-lg mt-5 mb-5 mx-auto bg-[#0D1B2A] rounded-2xl shadow-xl p-6">
      <h1 className="text-center text-3xl font-bold mb-4 text-[#ffffff]">
        {lang === "sr" ? "AI Asistent Apartmana" : "AI Apartment Assistant"}
      </h1>

      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="relative h-100 overflow-y-auto p-4 border border-gray-300 rounded-lg bg-cover bg-center transition-all duration-500"
      >
        {messages.length > 0 && (
          <div className="bg-white/60 rounded-lg p-2">
            {messages.map((m, i) => (
              <p
                key={i}
                className={`my-2 text-sm ${
                  m.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <b>
                  {m.role === "user"
                    ? lang === "sr"
                      ? "Gost:"
                      : "Guest:"
                    : lang === "sr"
                      ? "Asistent:"
                      : "Assistant:"}
                </b>{" "}
                {m.text}
              </p>
            ))}

            {isTyping && (
              <p className="text-sm text-gray-700 italic mt-2">
                {lang === "sr" ? "Asistent kuca..." : "Assistant is typing..."}
              </p>
            )}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder={
            lang === "sr" ? "Kako vam mogu pomoći?" : "How can I help you?"
          }
          className="flex-grow rounded-lg p-2 bg-[#2c2d30] text-white"
        />
        <button
          onClick={sendMessage}
          className="bg-[#2c2d30] text-white px-4 py-2 rounded-lg hover:bg-[#38393d] hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          {lang === "sr" ? "Pošalji" : "Send"}
        </button>
      </div>
    </div>
  );
}
