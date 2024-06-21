const express = require("express")
const app = express()
const port = 8000;
const Comment = require("./models/comment")
const Task = require("./models/task")
const Error400 = require("./models/error-400");
const Error404 = require("./models/error-404");


// "Database"
const Database = []


// Route handlers
// ==== Home Page ====
app.get("/", (req, res) => {
    return res.status(200).send("Todo Backend Server")
})

app.get("/todos", (req, res) => {
    // if there's no todos...
    if (Database.length === 0) {
        return res.status(200).send("No todos!")
    }

    try {
        let results = Task.getInfo()
        return res.status(200).send(results)
    } catch (error) {
        res.status(500)
        console.log(error)
        res.send({ message: "Something went wrong", status: 500 })
    }

})

// ==== Create a todo ====
app.post("/todos", (req, res) => {
    const { title, dueDate } = req.body

    try {
        if (!title) {
            throw new Error400("Title is required!")
        }

        if (!dueDate) {
            dueDate = null
        }

        const task = new Task(title, dueDate)
        Database.push(results)
        return res.status(201).send(task)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

// ===== Create a comment =====
app.post("/:todoId/comments", (req, res) => {
    // Retrieve the id from the request parameters
    const { id } = req.params
    const { text } = req.body

    try {
        if (!id) throw new Error400("Task Id is required")
        if (typeof id !== "number") throw new Error400("Task Id must be a number")
        if (!text) throw new Error400("Comment text required")

        // Find the task based on the id
        const taskResult = Database.find(task => task.id = id)

        if (!taskResult) throw new Error404("Task not found")

        // everything went well, let's make the comment
        let comment = new Comment(text)

        taskResult.comments.push(comment)
        return res.status(201).send(`comment created and added to ${taskResult.title}`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }

})

// TODO create delete task route
// TODO create delete comment route
// TODO test all endpoints via postman

// Server
app.listen(port, () => {
    console.log("Magic is happening on port", port)
})