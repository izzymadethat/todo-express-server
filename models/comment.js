module.exports = class Comment {
    constructor(text) {
        this.id = Comment.getAutoId()
        this.text = text
    }

    static idCount = 0
    static getAutoId() {
        Comment.idCount++
        return Comment.idCount
    }
}