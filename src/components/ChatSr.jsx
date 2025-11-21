import { useState } from "react";
import { askApartmentAI } from "../api/openai";
import { apartmentInfoSr } from "../data/apartmentInfoSr";

export default function ChatSr() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiReply = await askApartmentAI(input, apartmentInfoSr);
    const assistantMessage = { role: "assistant", text: aiReply };
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="max-w-lg mt-5 mb-5 mx-auto bg-[#e2af41] rounded-2xl shadow-xl p-6 border border-gray-200 transition-all duration-500 hover:shadow-gray-600 hover:-translate-y-1">
      <h1 className="text-center text-3xl font-bold mb-4 text-[#2c2d30] tracking-wide">
        AI Asistent Apartmana
      </h1>

      <div className="relative h-100 overflow-y-auto p-4 border border-gray-300 rounded-lg bg-[#2c2d30]">
        {messages.length > 0 ? (
          <div className="relative z-10 bg-white/60 rounded-lg p-2">
            {messages.map((m, i) => (
              <p
                key={i}
                className={`my-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "text-gray-900 text-right"
                    : "text-gray-900 text-left"
                }`}
              >
                <b>{m.role === "user" ? "Gost:" : "Asistent:"}</b> {m.text}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Kako vam mogu pomoći?"
          className="flex-grow rounded-lg p-2 text-[#ffffff] bg-[#2c2d30] focus:ring-1 focus:outline-none transition-all"
        />
        <button
          onClick={sendMessage}
          className="bg-[#2c2d30] text-[#ffffff] px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-[#1c1d1f] hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Pošalji
        </button>
      </div>
    </div>
  );
}
