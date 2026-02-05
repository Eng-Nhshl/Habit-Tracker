import { useHabits } from "../hooks/useHabits";
import HabitCard from "../components/HabitCard";

const HabitList = () => {
  const { habits, isLoading, isError } = useHabits();

  if (isLoading)
    return <div className="p-10 text-white">Loading your growth...</div>;
  if (isError)
    return <div className="p-10 text-red-400">Error loading habits.</div>;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Daily Rituals</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitList;
