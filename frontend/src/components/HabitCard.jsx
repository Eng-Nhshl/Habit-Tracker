import { useHabits } from "../hooks/useHabits";

const HabitCard = ({ habit }) => {
  const { toggleHabit, deleteHabit } = useHabits();

  const today = new Date().toISOString().split("T")[0];
  const isCompletedToday = habit.completedDates.includes(today);
  const themeColor = habit.color || "#6366f1";

  const calculateStreak = (dates) => {
    if (!dates || dates.length === 0) return 0;
    const sortedDates = [...dates].sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const todayStr = currentDate.toISOString().split("T")[0];
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (!dates.includes(todayStr) && !dates.includes(yesterdayStr)) return 0;

    let checkDate = dates.includes(todayStr) ? currentDate : yesterday;
    for (let i = 0; i < sortedDates.length; i++) {
      const dStr = checkDate.toISOString().split("T")[0];
      if (dates.includes(dStr)) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak(habit.completedDates);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${habit.name}"?`)) {
      deleteHabit(habit.id);
    }
  };

  return (
    <div className="group relative p-6 bg-slate-900 border border-slate-800 rounded-2xl transition-all hover:shadow-2xl shadow-indigo-500/5">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="absolute -top-2 -right-2 w-8 h-8 bg-slate-800 text-slate-400 hover:text-red-400 border border-slate-700 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
      >
        ×
      </button>

      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            {habit.category}
          </span>
          <div className="flex items-center gap-3">
            <h3
              className="text-xl font-semibold text-white transition-colors"
              style={{ color: isCompletedToday ? themeColor : "white" }}
            >
              {habit.name}
            </h3>
            {/* Streak Badge */}
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold animate-pulse">
                <span>🔥</span>
                <span>{streak}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => toggleHabit(habit)}
          style={
            !isCompletedToday
              ? { backgroundColor: themeColor }
              : { borderColor: `${themeColor}33`, color: themeColor }
          }
          className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
            isCompletedToday ? "bg-transparent border" : "text-white shadow-lg"
          }`}
        >
          {isCompletedToday ? "✓ Done" : "Complete"}
        </button>
      </div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>
            Daily Goal: {habit.goal} {habit.unit}
          </span>
          <span>{isCompletedToday ? "100%" : "0%"}</span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-700 ease-out"
            style={{
              width: isCompletedToday ? "100%" : "5%",
              backgroundColor: themeColor,
              boxShadow: isCompletedToday ? `0 0 10px ${themeColor}` : "none",
            }}
          ></div>
        </div>
      </div>

      {/* Stats footer */}
      <div className="mt-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col">
          <p className="text-xs text-slate-500 uppercase tracking-tighter">
            Total Completions
          </p>
          <p className="text-lg font-mono text-slate-200">
            {habit.completedDates.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
