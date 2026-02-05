# ⚛️ Atomic Habits

**"1% better every day."**

Atomic Habits is a minimalist, high-performance habit tracker built to help you build momentum and stay consistent. Inspired by the philosophy of James Clear, this application focuses on small changes that lead to remarkable results.

---

## ✨ Features

- **Dynamic Theming**: Custom color palettes for every habit that sync across the UI.
- **Streak Logic**: Built-in algorithm to track and display your "Fire" streak.
- **Global Notifications**: Integrated Redux-managed toast system for real-time feedback.
- **MERN Stack**: Powered by MongoDB, Express, React, and Node.js.
- **Modern UI**: Built with **Tailwind CSS v4** featuring glassmorphism and smooth transitions.
- **Data Persistence**: Full CRUD capabilities with optimistic UI updates via **TanStack Query**.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, TanStack Query (v5), Tailwind CSS v4.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB Atlas.
- **State Management**: Redux for UI state; React Query for Server state.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/Eng-Nhshl/Habit-Tracker.git
cd atomic-habits

```

2. **Setup Backend**

```bash
cd backend
npm install

```

Create a `.env` file in the `backend` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=3001

```

Start the server:

```bash
npm run dev

```

3. **Setup Frontend**

```bash
cd ../frontend
npm install
npm run dev

```

## 🧠 Core Concept: The Atomic Schema

The project utilizes a robust Mongoose schema to ensure data integrity:

```javascript
// Example Schema structure
{
  name: "Read Books",
  goal: 10,
  unit: "pages",
  color: "#6366f1",
  completedDates: ["2026-02-05", "2026-02-06"]
}

### 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
