const habitsRouter = require("express").Router();
const Habit = require("../models/habit");

habitsRouter.get("/", async (req, res) => {
  const habits = await Habit.find({});
  res.json(habits);
});

habitsRouter.get("/:id", async (req, res) => {
  const habit = await Habit.findById(req.params.id);

  if (habit) {
    res.json(habit);
  } else {
    res.status(404).end();
  }
});

habitsRouter.post("/", async (req, res) => {
  const { name, goal, unit, category, color } = req.body;

  if (!name || !goal) {
    return res.status(400).json({
      error: "name and goal are required",
    });
  }

  const habit = new Habit({
    name,
    goal: Number(goal),
    unit: unit,
    category: category,
    color: color,
    completedDates: [],
  });

  const savedHabit = await habit.save();
  res.status(201).json(savedHabit);
});

habitsRouter.put("/:id", async (req, res) => {
  const { name, goal, unit, category, color, completedDates } = req.body;

  const updatedHabit = await Habit.findByIdAndUpdate(
    req.params.id,
    { name, goal, unit, category, color, completedDates },
    { new: true, runValidators: true, context: "query" },
  );

  if (updatedHabit) {
    res.json(updatedHabit);
  } else {
    res.status(404).end();
  }
});

habitsRouter.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = habitsRouter;
