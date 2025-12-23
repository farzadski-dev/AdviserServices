const catchAsync = require('../utils/catchAsync');

const {
	sendCreatedResponse,
	sendSuccessResponse,
	sendDeleteResourceMessage,
	sendFailureMessageForNotImplement,
	sendFailureMessage,
} = require('../utils/sendResponse');

class Controller {
	constructor() {
		this.catchAsync = catchAsync;
		this.sendSuccessResponse = sendSuccessResponse;
		this.sendCreatedResponse = sendCreatedResponse;
		this.sendDeleteResourceMessage = sendDeleteResourceMessage;
		this.sendFailureMessageForNotImplement =
			sendFailureMessageForNotImplement;
		this.sendFailureMessage = sendFailureMessage;
	}
}

module.exports = Controller;
