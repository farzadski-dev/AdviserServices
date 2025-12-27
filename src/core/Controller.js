const catchAsync = require("../utils/catchAsync"),
	{
		sendCreatedResponse,
		sendSuccessResponse,
		sendDeleteResourceMessage,
		sendFailureMessageForNotImplement,
		sendFailureMessage,
	} = require("../utils/sendResponse"),
	AsyncWrap = require("@Core/AsyncWrap");

class Controller {
	constructor() {
		this.catchAsync = catchAsync;
		this.asyncWrap = new AsyncWrap();
		this.sendSuccessResponse = sendSuccessResponse;
		this.sendCreatedResponse = sendCreatedResponse;
		this.sendDeleteResourceMessage = sendDeleteResourceMessage;
		this.sendFailureMessageForNotImplement = sendFailureMessageForNotImplement;
		this.sendFailureMessage = sendFailureMessage;
	}
}

module.exports = Controller;
