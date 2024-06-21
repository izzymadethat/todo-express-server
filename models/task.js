module.exports = class Task {
    constructor(title, date) {
        this.id = this.getAutoId()
        this.title = title
        this.dueDate = date ?? null
        this.comments = []

        Task.allTasks.push(this)
    }

    static idCount = 0;
    static allTasks = []

    static getAutoId() {
        Task.idCount++
        return Task.idCount
    }

    addComment(comment) {
        this.comments.push(comment)
    }

    static getInfo() {
        return Task.allTasks.map(task => {
            let comments;

            if (task.comments) {
                comments = task.comments.map(comment => comment.text)
            }

            return `Task: ${task.name}, 
             Due Date: ${task.dueDate ?? "Not Set"}, 
             Comments: ${comments ?? "No comments found."} 
            `
        })
    }
}
