module.exports = class Error400 extends Error {
    constructor(message) {
        this.message = message
        this.status = 400
    }
}