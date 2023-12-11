const mongoose = require("mongoose");

const Todo = require("../models/todo");
const { resHandler } = require("../util/responseHandler");

// get all todo
const getTodo = async (req, res) => {
  const todo = await Todo.find({}).sort({ createdAt: -1 });
  res.status(200).json(todo);
};

// get single workout
const singleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return resHandler({
        res, 
        statusCode: 400,
        message: "no such Workout"
      })
    }
    const todo = await Todo.findById(id);

    if (!todo) {
      return resHandler({
        res, 
        statusCode: 400,
        message: "no such Workout"
      })
      
     
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// create new todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;
  // add to db
  try {
    const todo = await Todo.create({ title, description });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};

// update a todo
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resHandler({
      res,
      statusCode: 400,
      message: "no such Workout",
    });
  }

  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    return resHandler({
      res,
      statusCode: 200,
      data: todo,
    });
  } catch (error) {
    return resHandler({
        res, 
        statusCode: 400,
        message: "no such Workout"
      })
  }
};

// delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return resHandler({
        res, 
        statusCode: 400,
        message: "no such Workout"
      })
  }

  const todo = await Todo.findByIdAndDelete({ _id: id });

  if (!todo) {
    return resHandler({
        res, 
        statusCode: 400,
        message: "no such Workout"
      })
  }

  res.status(200).json(todo);
};

module.exports = {
  createTodo,
  getTodo,
  singleTodo,
  updateTodo,
  deleteTodo,
};
