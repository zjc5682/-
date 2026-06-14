export class CustomError extends Error {
    constructor({ networkResponse = null, error = null } = {}) {
        super('CustomError')
        this.networkResponse = networkResponse
        this.error = error
    }
}