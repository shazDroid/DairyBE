"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleException = void 0;
function handleException(error, req, res, next) {
    console.log(error);
    return res.status(500).json({ "message": "Server error", "error": error });
}
exports.handleException = handleException;
