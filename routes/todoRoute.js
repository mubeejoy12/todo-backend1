const express = require("express");

const {
  createTodo,
  getTodo,
  singleTodo,
  updateTodo,
  deleteTodo,
} = require("../controler/todoControler");

const router = express.Router();

// Get all todo
router.get("/getAllTodo", getTodo);

// Get single todo
router.get("/singleTodo/:id", singleTodo);

// Post a new todo
router.post("/createTodo", createTodo);

// Upadate todo
router.patch("/updatTodo/:id", updateTodo);

// delete todo
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
