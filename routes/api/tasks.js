const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Task model
const Task = require("../../models/task");
const User = require("../../models/user");
const { json } = require("body-parser");
const user = require("../../models/user");

//@route GET api/users
router.get("/users", (req, res) => {
  User.find()
    .sort({ name: 1 })
    .then(user => {
      res.json(user);
    });
});

//@route GET api/tasks
router.get("/tasks", (req, res) => {
  Task.find()
    .sort({ name: 1 })
    .then(tasks => {
      res.json(tasks);
    });
});

//@route GET api/users/id/tasks
// GET all the users tasks

router.get("/users/:id/tasks", (req, res) => {
  const id = req.params.id;

  User.findOne({ _id: id })
    .populate("tasks") // only works if we pushed refs to children
    .exec(function (err, user) {
      if (err) return handleError(err);
      res.json(user.tasks);
    });
});

//@route POST api/users
//Create new user
router.post("/users", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name.toLowerCase(),
      email: req.body.email,
      password: hashedPassword,
    });

    newUser.save(function (err) {
      if (err) res.status(500).send(err);

      res.json(newUser);
    });
  } catch {
    res.status(500).send(false);
  }
});

//@route POST api/tasks
//Create new task
router.post("/tasks", async (req, res) => {
  const newTask = new Task({
    name: req.body.name,
    date: req.body.date,
    user: req.body.user,
  });

  newTask.save();

  await User.findById(req.body.user, function (err, user) {
    if (err) handleError(err);
    user.tasks.push(newTask._id);
    user.save();

    res.json(user);
  });
});

//@route POST api/tasks/:id
//Delete task
router.delete("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      User.findById(task.user, function (err, user) {
        if (err) res.json({ success: false });
        user.tasks.pull(task._id);
        user.save();
      });

      task.remove().then(() => res.json({ success: true }));
    })
    .catch(err => {
      res.status(404).json({ success: false });
    });
});

//@route POST api/users/:id
//Delete user
router.delete("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then(task => task.remove().then(() => res.json({ success: true })))
    .catch(err => {
      res.status(404).json({ success: false });
    });
});

//@route POST api/users/checkusername
//Checks if username already exists
router.post("/users/checkusername", async (req, res) => {
  await User.find({ name: req.body.name }, function (err, user) {
    if (err) {
      res.send("Signup error");
    }
    res.json(user);
  });
});

//@route POST api/users/checkemail
//Checks if email already exists
router.post("/users/checkemail", async (req, res) => {
  const user = await User.find({ email: req.body.email });
  res.json(user);
});

// @route POST api/users/login
// Lets user login
router.post("/users/login", async (req, res) => {
  const user = await User.findOne({ name: req.body.name }).exec();

  if (user == null) {
    res.json({ success: false });
  }

  const match = await bcrypt.compare(
    req.body.password,
    user.toObject().password
  );

  if (match) {
    res.json({ user, success: true });
  }

  res.json({ success: false });
});

// @route POST api/tasks/addtomatoe
// increments the number of tomatoes for the task

router.put("/tasks/addtomatoe", (req, res) => {
  const query = { _id: req.body.id };

  Task.findByIdAndUpdate(
    query,
    { $inc: { tomatoes: 1 } },

    function (err, doc) {
      if (err) return res.send(500, { error: err });
      return res.send("Sucessfully saved");
    }
  );
});

//@route GET api/tasks/:id
//GET task
router.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id)
    .then(task => {
      res.json(task);
    })
    .catch(err => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
