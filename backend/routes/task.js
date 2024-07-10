const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const auth= require('../middleware/auth')

//creating a task
router.post("/task", auth, async (req, res) => {
  console.log(req.body);
  const task = new Task({
    ...req.body,
    "owner": req.user._id
  }
   
  );

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all the tasks of a user
// routes/tasks.js
router.get('/tasks/me', auth, async (req, res) => {
  const type = req.query.type;
  const match = {};

  if (type) {
    match.type = type;
  }

  try {
    console.log(`Fetching tasks for user ${req.user._id} with type: ${type}`);
    const tasks = await Task.find({ owner: req.user._id, ...match });
    console.log(`Found ${tasks.length} tasks`);
    res.send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


// router.get("/tasks/important",auth, async (req, res) => {
//   const _id = req.user._id;

//   try {
//     const tasks = await Task.find({ owner: _id,"type":req.params.text1 });
//     res.send(tasks);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });


//get one task of a user
router.get("/tasks/single/:id",auth, async (req, res) => {
    console.log(req.params)
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id,"owner":req.user._id });
    if (!task) {
      return res.status(404).send("Task Not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//   const updates = Object.keys(req.body);
//   console.log(updates);

//   const allowUpdates = ["description", "completed"];
//   const isValidOperation = updates.every((update) => {
//     return allowUpdates.includes(update);
//   });

//   if (!isValidOperation) {
//     res.send({ ERROR: "INVALID OPERATION" });
//   }
//update
router.patch("/tasks/:id",auth, async (req, res) => {

const _id=req.params.id
  try {
    const task = await Task.findByIdAndUpdate({_id,"owner":req.user._Id},req.body,{new:true});

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send();
  }
});

///////

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOneAndDelete({ _id, "owner": req.user._id }); 
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
