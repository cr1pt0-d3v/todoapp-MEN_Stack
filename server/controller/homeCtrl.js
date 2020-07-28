// Task model
const Task = require("../models/Task");
const { update } = require("../models/Task");

const homeCtrl = {};

// get all the tasks
homeCtrl.home = async (req, res) => {
  const tasks = await Task.find();
  /* console.log(tasks); */
  res.render("home", { tasks });
};

//adding Task
homeCtrl.addTask = async (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
  });
  try {
    const addedTask = await newTask.save();
    /* res.json(addedTask); */
    res.redirect("/");
    res.end();
  } catch (err) {
    res.json({ message: err });
  }
};

// deleting Task
homeCtrl.deleteTask = async (req, res) => {
  const { id } = req.query;
  try {
    const removedTask = await Task.deleteOne({ _id: id });
    /* res.json(removedTask); */
    res.redirect("/");
  } catch (error) {
    res.json({ message: error });
  }
};

// updating Task
homeCtrl.updateTask = async (req, res) => {
  const { id } = req.query;
  try {
    const updatedTask = await Task.updateOne(
      { _id: id },
      {
        $set: {
          title: req.body.updateTitle,
          description: req.body.updateDescription,
        },
      }
    );
    /*  res.json(updatedTask); */
    res.redirect("/");
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = homeCtrl;
