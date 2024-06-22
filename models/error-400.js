module.exports = class Error400 extends Error {
    constructor(message) {
        super()
        this.message = message
        this.status = 400
    }
}