// Task model
const Task = require("../models/Task");

const homeCtrl = {};

/* homeCtrl.home = (req, res) => {
  Task.find((err, tasks) => {
    if (err) throw err;
    console.log(tasks);
    res.render("home", { data: tasks });
  });
}; */

homeCtrl.home = async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.render("home", { tasks });
};

//adding tasks
homeCtrl.addTask = (req, res) => {
  const { title, description } = req.body;
  const newTask = new Task({
    title,
    description,
  });
  newTask
    .save()
    .then((task) => console.log(`${task} succesfully added!!!`))
    .catch((err) => console.log(err));
  res.redirect("/");
  res.end();
};

module.exports = homeCtrl;
