module.exports = class Comment {
    constructor(text) {
        this.id = Comment.getAutoId()
        this.text = text
    }
}