# 🧙‍♂️ Magicka Frontend

A real-time magical battle platform where users can sign up, manage profiles, chat, and duel each other using magical powers — powered by React, Redux, and Django Channels.

🌐 [Live Demo](https://magicka-frontend-auth-git-feature1-lucas-projects-f61d5cb5.vercel.app/)

---

## ⚙️ Tech Stack

### Frontend
- [React](https://reactjs.org/) (with Vite)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router v6+](https://reactrouter.com/)
- [Font Awesome](https://fontawesome.com/)
- [Axios](https://axios-http.com/)

### Backend (separate repo)
- Django + Django Channels (WebSocket)
- SQLite

### Dev Tools
- Vite + ESLint
- Travis CI/CD
- Vitest for testing

---

## 🧪 Features

- 🔐 **Authentication**
  - Sign up and log in
  - Edit user profile

- 🧍 **User Interaction**
  - Browse a list of users
  - Click to initiate different types of attacks
  - See full attack history

- ⚔️ **Real-Time Battle**
  - Enter a chat room with another user
  - Select magical powers to attack in real time
  - Health status updates dynamically via WebSockets

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Backend Django server running with WebSocket support

### Install and Run
```bash
npm install
npm run dev
Build for Production

npm run build
Lint

npm run lint
Preview Production Build

npm run preview
🛠 Folder Structure
graphql

src/
├── components/         # Reusable UI components
├── features/           # Redux features
├── pages/              # Page views (e.g., Home, ChatRoom)
├── services/           # API logic with Axios
├── App.jsx
├── main.jsx
└── index.css
🧪 Running Tests

npm run test
📦 Deployment
Deployed on Vercel

CI/CD pipeline handled by Travis CI

📌 Notes
This is the frontend only. Ensure the Django backend is running properly for WebSocket communication and API interaction.

The app is mobile-responsive and optimized for performance using Vite.

📄 License
This project is open-source and free to use for educational or demo purposes.