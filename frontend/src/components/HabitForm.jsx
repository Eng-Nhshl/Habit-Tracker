import { useState } from "react";
import { useField } from "../hooks/useField";
import { useHabits } from "../hooks/useHabits";

const HabitForm = () => {
  const { addHabit, isAdding } = useHabits();

  // Initialize fields using your custom hook
  const { reset: clearName, ...name } = useField("text");
  const { reset: clearGoal, ...goal } = useField("number");
  const { reset: clearUnit, ...unit } = useField("text");
  const { reset: clearCategory, ...category } = useField("text");

  const [selectedColor, setSelectedColor] = useState("#6366f1");

  const colors = [
    { name: "Indigo", hex: "#6366f1" },
    { name: "Emerald", hex: "#10b981" },
    { name: "Rose", hex: "#f43f5e" },
    { name: "Amber", hex: "#f59e0b" },
    { name: "Sky", hex: "#0ea5e9" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(goal.value) <= 0) {
      alert("Goal must be greater than 0");
      return;
    }

    // Construct the new habit object
    const newHabit = {
      name: name.value,
      goal: Number(goal.value),
      unit: unit.value || "times",
      category: category.value || "General",
      color: selectedColor,
    };

    addHabit(newHabit, {
      onSuccess: () => {
        clearName();
        clearGoal();
        clearUnit();
        clearCategory();
        setSelectedColor("#6366f1");
      },
    });
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Habit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Habit Name
          </label>
          <input
            {...name}
            placeholder="e.g. Read Books"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Daily Goal
            </label>
            <input
              {...goal}
              placeholder="10"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Unit
            </label>
            <input
              {...unit}
              placeholder="pages"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-400 mb-1">
            Category
          </label>
          <input
            {...category}
            placeholder="Education"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-400 mb-3">
            Theme Color
          </label>
          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color.hex}
                type="button"
                onClick={() => setSelectedColor(color.hex)}
                className={`w-10 h-10 rounded-full cursor-pointer transition-all ${
                  selectedColor === color.hex
                    ? "ring-4 ring-white scale-110"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isAdding}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer mt-4"
        >
          {isAdding ? "Saving..." : "Create Habit"}
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
