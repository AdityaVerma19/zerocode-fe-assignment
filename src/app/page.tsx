"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useRef, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

// declare global {
//   interface Window {
//     SpeechRecognition: any;
//     webkitSpeechRecognition: any;
//   }
// }

// const SpeechRecognition =
//   typeof window !== "undefined" &&
//   (window.SpeechRecognition || window.webkitSpeechRecognition);

// let recognition: any;

// if (SpeechRecognition) {
//   recognition = new SpeechRecognition();
//   recognition.continuous = false;
//   recognition.lang = "en-US";
// }

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

export default function Home() {


  const exportChatAsTxt = () => {
    if (messages.length === 0) {
      alert("No messages to export.");
      return;
    }
  
    const content = messages
      .map((msg) => `${msg.sender === "user" ? "You" : "Bot"}: ${msg.text}`)
      .join("\n");
  
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat-transcript.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  


  const getBotReply = (input: string): string => {
    const msg = input.toLowerCase();
    if (msg.includes("hello")) return "Hey there! 👋";
    if (msg.includes("joke")) return "Why did the web developer go broke? Because he used up all his cache. 😂";
    if (msg.includes("time")) return `It's ${new Date().toLocaleTimeString()}`;
    if (msg.includes("name")) return "I'm Zerobot, your friendly chat buddy! 🤖";
    return "Sorry, I didn’t understand that.";
  };
  


  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  }

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    const botReply: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: "Hi, I'm a bot! 🤖",
    };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // const handleVoiceInput = () => {
  //   if (!recognition) {
  //     alert("Speech Recognition not supported in this browser.");
  //     return;
  //   }

  //   if (!isListening) {
  //     recognition.start();
  //     setIsListening(true);

  //     recognition.onresult = (event: any) => {
  //       const transcript = event.results[0][0].transcript;
  //       setInput((prev) => prev + " " + transcript);
  //     };

  //     recognition.onend = () => {
  //       setIsListening(false);
  //     };
  //   } else {
  //     recognition.stop();
  //     setIsListening(false);
  //   }
  // };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-blue-200 dark:bg-gray-800 shadow-md rounded-t-2xl border-b border-gray-200 dark:border-gray-700">

  {/* Left - Chat Title */}
  <div className="text-lg font-semibold text-gray-800 dark:text-white tracking-wide">
    My ChatBot
  </div>

  {/* Right - User, Theme Toggle, Logout */}
  <div className="flex items-center gap-4 text-sm">
    {/* Username */}
    <span className="text-gray-600 dark:text-gray-300 font-medium">
      {user?.displayName || "User"}
    </span>

    {/* Dark Mode Toggle */}
    <ThemeToggle />

    {/* Logout Button */}
    <button
      onClick={handleLogout}
      className="px-6 py-2 rounded-full bg-white text-blue-600 uppercase text-xs font-semibold border border-blue-600 shadow transition-all duration-300 hover:tracking-wider hover:bg-blue-600 hover:text-white hover:shadow-[0_7px_29px_0px_rgba(93,24,220,0.8)] active:translate-y-1 active:shadow-none"
    >
      Logout
    </button>
  </div>
</header>


      <main className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
  className={`px-4 py-2 max-w-[75%] rounded-2xl text-sm relative ${
    msg.sender === "user"
      ? "bg-[#00B2FF] text-white ml-auto rounded-br-none"
      : "bg-[#F0F0F0] text-gray-900 mr-auto rounded-bl-none"
  }`}
>
  <p>{msg.text}</p>
  <span className="text-[10px] absolute bottom-[-16px] right-2 text-gray-400">
    {new Date(msg.id).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
  </span>
</div>

          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>
      <section className="px-4 py-2 flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800">
  {["Hello", "Tell me a joke", "What's the time?", "What’s your name?"].map((prompt) => (
    <button
      key={prompt}
      onClick={() => {
        const userMessage = {
          id: Date.now(),
          sender: "user" as const,
          text: prompt,
        };

        const botReply = {
          id: Date.now() + 1,
          sender: "bot" as const,
          text: getBotReply(prompt),
        };

        setMessages((prev) => [...prev, userMessage, botReply]);
      }}
      className="px-3 py-1 rounded bg-blue-100 dark:bg-blue-800 dark:text-white text-sm hover:bg-blue-200"
    >
      {prompt}
    </button>
  ))}
</section>

      <footer className="p-4 bg-white dark:bg-gray-800 flex gap-2">
        <textarea
          rows={1}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none dark:bg-gray-700 dark:text-white"
        />

        <button
          // onClick=//{handleVoiceInput}
          className={`px-4 py-2 rounded-lg ${
            isListening ? "bg-red-500" : "bg-gray-300 dark:bg-gray-700"
          } text-white`}
        >
          🎤
        </button>
        <button
  onClick={exportChatAsTxt}
  className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
>
  📥 Export
</button>

      </footer>
    </div>
  );
}
