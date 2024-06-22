module.exports = class Task {
    constructor(title, date) {
        this.id = Task.getAutoId()
        this.title = title
        this.dueDate = date ?? null
        this.comments = []

        Task.allTasks.push(this)
    }

    static idCount = 0;
    static allTasks = [];

    static getAutoId() {
        Task.idCount++
        return Task.idCount
    }

    addComment(comment) {
        this.comments.push(comment)
    }

    // Shows all tasks in a pretty format
    static getInfo() {
        let allTasks = {}

        Task.allTasks.forEach(task => {
            let comments;
            let taskId = String(task.id)

            if (task.comments.length > 0) {
                comments = task.comments.map(comment => comment.text)
            }

            allTasks[taskId] = {
                task: task.title,
                due_date: task.dueDate ?? "Not set",
                comments: comments ?? "No comments found"
            }


        })

        return allTasks
    }
}
