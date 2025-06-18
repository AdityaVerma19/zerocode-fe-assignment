# 💬 Zerocode FE Assignment – Chatbot Web App

This is a modern, mobile-responsive chatbot web application built using **Next.js 14**, **TypeScript**, and **Tailwind CSS**, as part of the Zerocode Frontend Internship Assignment.

It features a Firebase-powered login/register system, real-time chat UI, dark mode toggle, and bonus features like prompt templates and chat export.

---

## 🚀 Features

- 🔐 **Authentication** via Firebase (register + login)
- 💬 **Chat UI** with user-bot conversation
- 🌗 **Dark/Light Mode Toggle**
- 🧠 **Prompt Templates** for quick testing
- 💾 **Chat Export** (.txt file download)
- 🎯 **Responsive UI** for desktop & mobile
- 🎨 **Styled login/register pages** inspired by Uiverse.io

---

## 🧱 Tech Stack

| Tool       | Usage                      |
|------------|----------------------------|
| **Next.js** | App routing, pages, layout |
| **TypeScript** | Type safety, props        |
| **Tailwind CSS** | Responsive styling     |
| **Firebase Auth** | User login/register  |
| **Vercel** | Hosting + CI/CD pipeline    |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AdityaVerma19/zerocode-fe-assignment.git
cd zerocode-fe-assignment

2. Install Dependencies
bash
Copy
Edit
npm install

3. Configure Firebase
Set up your Firebase project and paste your config in src/lib/firebase.ts.

Example:

ts
Copy
Edit
const firebaseConfig = 
{
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "..."
};

4. Run the App Locally
bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser.

🌐 Live Demo
🔗 https://zerocode-fe-assignment-ctpb.vercel.app

Login Page → /login

Register Page → /register

Chat Interface → / (after login)

🧪 Test Credentials
makefile
Copy
Edit
Email: aditya1234@gmail.com
Password: Aditya


🧠 Architecture Diagram
txt
Copy
Edit
src/
├── app/
│   ├── login/        → Login page (Next.js app router)
│   ├── register/     → Register page
│   ├── layout.tsx    → Global layout wrapper
│   └── page.tsx      → Main Chat UI (protected)
│
├── components/
│   └── ThemeToggle.tsx     → Dark mode toggle switch
│
├── lib/
│   └── firebase.ts         → Firebase app config
│
├── context/
│   └── AuthContext.tsx     → Firebase auth provider
📷 Screenshots
(Save these in public/screens/ and replace links below)

Login Page	Chat Interface	Dark Mode

📂 Folder Structure Overview
src/app/: Pages using Next.js App Router

src/components/: UI components like ThemeToggle

src/lib/: Firebase initialization

src/context/: Auth provider logic

tailwind.config.js: Tailwind theme customization

📄 License
This project was built as part of a frontend internship assignment for Zerocode.
You are free to fork, clone, or extend it for educational/demo purposes.

Built with ❤️ by Aditya Verma