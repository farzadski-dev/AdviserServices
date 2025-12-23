const {
    SUCCESS,
    FAILED,
    SERVER_ERROR
} = require("./../controllers/Error/services/ErrorTemplates");

class ResponseMessage {
    constructor(response) {
        this.response = response;
    }

    sendSuccessMessage(statusCode = 200, data = {}) {
        this.response.status(statusCode).json({
            status: SUCCESS,
            ...data
        });
    }

    sendFailureMessage(statusCode, errorMessage) {
        this.response.status(statusCode).json({
            status: FAILED,
            ...errorMessage,
        });
    }

    sendServerError() {
        this.response.status(500).json({
            status: FAILED,
            errorMessage: SERVER_ERROR
        });
    }

    sendUnauthorizedErrorMessage(errorMessage) {
        this.response.status(401).json({
            status: FAILED,
            ...errorMessage,
        });
    }

}

module.exports = ResponseMessage;

