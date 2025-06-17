"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import ThemeToggle from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f2f2] dark:bg-gray-900 relative p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center bg-[#EDDCD9] border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] px-8 py-10">
        <p className="text-[#264143] font-black text-2xl mb-6">LOGIN</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col items-start">
            <label className="font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-[290px] p-3 rounded text-sm focus:translate-y-[4px] focus:shadow-[1px_2px_0px_0px_#E99F4C]"
              required
            />
          </div>

          <div className="flex flex-col items-start">
            <label className="font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-[290px] p-3 rounded text-sm focus:translate-y-[4px] focus:shadow-[1px_2px_0px_0px_#E99F4C]"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="bg-[#DE5499] text-white font-bold w-[290px] py-3 mt-4 rounded-xl text-sm shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-90"
          >
            LOGIN
          </button>

          <p className="mt-2 text-sm font-bold text-[#264143]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#264143] underline">
              Register Here!
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
