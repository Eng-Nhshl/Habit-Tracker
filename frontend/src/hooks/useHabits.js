import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import habitService from "../services/habits";
import { notify } from "../reducers/notificationReducer";

export const useHabits = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const habitsQuery = useQuery({
    queryKey: ["habits"],
    queryFn: habitService.getAll,
  });

  const addMutation = useMutation({
    mutationFn: habitService.create,
    onSuccess: (newHabit) => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      dispatch(notify(`Successfully added ${newHabit.name}`));
    },
    onError: (error) => {
      dispatch(notify("Error: " + error.message, "error"));
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (habit) => {
      const today = new Date().toISOString().split("T")[0];
      const isCompleted = habit.completedDates.includes(today);

      const updatedDates = isCompleted
        ? habit.completedDates.filter((d) => d !== today)
        : [...habit.completedDates, today];

      return habitService.update(habit.id, {
        ...habit,
        completedDates: updatedDates,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => habitService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
      dispatch(notify("Habit deleted", "error"));
    },
  });

  return {
    habits: habitsQuery.data || [],
    isLoading: habitsQuery.isLoading,
    isError: habitsQuery.isError,
    addHabit: addMutation.mutate,
    isAdding: addMutation.isPending,
    toggleHabit: toggleMutation.mutate,
    deleteHabit: deleteMutation.mutate,
  };
};
