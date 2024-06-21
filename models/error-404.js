module.exports = class Error404 extends Error {
    constructor(message) {
        this.message = message
        this.status = 404
    }
}