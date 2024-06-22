const express = require("express")
const app = express()
const port = 8000;
const Comment = require("./models/comment")
const Task = require("./models/task")
const Error400 = require("./models/error-400");
const Error404 = require("./models/error-404");

/**
 * When creating a rest point, write code that will handle:
 * - Edge cases
 * - Missing information
 * - try/catch blocks for code that could go wrong (server errors, incorrect api)
 * - 
 */


// "Database"
// Whenever a task is created, push into this database
const Database = []

// middleware I needed
app.use(express.json())

// Route handlers
// ==== Home Page ====
app.get("/", (req, res) => {
    // Just return message, but this is usually a homepage
    return res.status(200).send("Todo Backend Server")
})

// ===== Todos =====
app.get("/todos", (req, res) => {

    // if there's no todos in the database...
    if (Database.length === 0) {
        return res.status(200).send("No todos!")
    }

    try {
        // use getInfo() in Task class to formulate an array
        // of tasks formatted how we set it up
        let results = Task.getInfo()
        return res.status(200).send(results)
    } catch (error) {
        // Something went wrong.
        // Log the ACTUAL error to our server
        // SEND a message to the requester
        res.status(500)
        console.log(error)
        res.send({ message: "Something went wrong", status: 500 })
    }

})

// ==== Create a todo ====
app.post("/todos", (req, res) => {
    // Get title and due date from request body
    const { title, dueDate } = req.body

    try {
        // if there's no title at all, case closed
        if (!title) {
            return res.status(400).send({ error: "Title is required!" })
        }
        // if we don't have a due date and try to get it from
        // the body, it will be undefined. I want it to be null 
        const taskDueDate = dueDate || null

        // create a new Task based on the Task Class 
        const task = new Task(title, taskDueDate)
        // push into database for later use
        Database.push(task)

        // return "Created" and the Task
        return res.status(201).send(task)
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error.message })
    }

})

// ===== Create a comment =====
app.post("/:todoId/comments", (req, res) => {
    // Retrieve the id from the request parameters
    // Then get the text from the body
    const todoId = Number(req.params.todoId)
    const { text } = req.body

    try {
        // No task id in the address bar? ERROR
        // task id given is NOT a number? ERROR
        // no comment text? ERROR 
        if (!todoId) return res.status(400).send("Task Id is required!")
        if (isNaN(todoId)) return res.status(400).send("Task Id must be a number")

        if (!text) return res.status(400).send("Comment text required")

        // Find the task based on the id
        const taskResult = Database.find(task => task.id === todoId)

        // couldn't find the task after the search? ERROR
        if (!taskResult) return res.status(404).send("Task not found")

        // everything went well, let's make the comment
        let comment = new Comment(text)

        taskResult.addComment(comment)
        return res.status(201).send(`comment created and added to ${taskResult.title}`)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})

// //  TODO create delete task route
app.delete("/todos/:todoId/delete", (req, res) => {
    const todoId = Number(req.params.todoId)

    // don't have id ? ERROR
    // id not a number ? ERROR
    if (!todoId) return res.status(400).send("Task Id is required")
    if (isNaN(todoId)) return res.status(400).send("Task Id must be a number")

    try {
        // Find the task based on the todo Id
        const taskIndex = Database.findIndex(task => task.id === todoId)

        // If we don't have a task 
        if (taskIndex === -1) return res.status(404).send("Task not found!")

        // save the task to tell what task's been deleted
        const taskResult = Database[taskIndex]
        Database.splice(taskIndex, 1)

        return res.status(200).send(`${taskResult.title} successfully deleted.`)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
// // TODO create delete comment route
// // TODO test all endpoints via postman

// Server
app.listen(port, () => {
    console.log("Magic is happening on port", port)
})