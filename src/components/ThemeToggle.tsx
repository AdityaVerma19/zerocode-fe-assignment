"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setIsDark(!isDark);

    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <label className="relative inline-block w-14 h-8 border border-gray-300 dark:border-violet-500 rounded-md">

      <input
        type="checkbox"
        className="peer opacity-0 w-0 h-0"
        checked={isDark}
        onChange={toggleTheme}
      />
      <span
        className={`
   
          absolute top-0 left-0 right-0 bottom-0 
          bg-gray-300 dark:bg-gray-800 
          rounded-md 
          transition duration-300 
          peer-checked:bg-gray-900
          peer-checked:shadow-inner
        `}
      ></span>
      <span
        className={`
   
          absolute bottom-[0.3em] left-[0.3em]
          h-[1.4em] w-[0.1em] 
          bg-white 
          transition-transform duration-300 
          peer-checked:translate-x-[2.8em] 
          peer-checked:rotate-[360deg]
        `}
      ></span>
    </label>
  );
}
