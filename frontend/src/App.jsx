import React from "react";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";
import Notification from "./components/Notification";

const App = () => {
  return (
    // This wrapper ensures the whole screen is dark
    <div className="min-h-screen bg-slate-950 py-12 px-4 selection:bg-indigo-500/30">
      {/* Global Notification */}
      <Notification />

      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
            Atomic{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-rose-500">
              Habits
            </span>
            <span className="text-indigo-500">.</span>
          </h1>
          <p className="text-slate-400 font-medium">1% better every day.</p>
        </header>

        <main className="space-y-12">
          {/* Form Section */}
          <section>
            <HabitForm />
          </section>

          {/* List Section */}
          <section>
            <HabitList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
