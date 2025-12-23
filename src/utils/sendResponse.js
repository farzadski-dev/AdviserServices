const ResponseMessage = require("./ResponseMessage");
const { NOT_EXIST } = require("../controllers/Error/services/ErrorTemplates");

exports.sendCreatedResponse = (response, message, statusCode = 201) => {
	const responseMessage = new ResponseMessage(response);
	return responseMessage.sendSuccessMessage(statusCode, message);
};

exports.sendSuccessResponse = (response, message, statusCode = 200) => {
	const responseMessage = new ResponseMessage(response);
	return responseMessage.sendSuccessMessage(statusCode, message);
};

exports.sendFailureMessage = (response, message, statusCode = 500) => {
	const responseMessage = new ResponseMessage(response);
	return responseMessage.sendFailureMessage(statusCode, message);
};

exports.sendFailureMessageForNotImplement = (response) => {
	const responseMessage = new ResponseMessage(response);
	return responseMessage.sendFailureMessage(501, {
		errorMessage: " NOT_IMPLEMENTED",
	});
};

exports.sendDeleteResourceMessage = (
	response,
	resourceName,
	statusCode = 404
) => {
	const responseMessage = new ResponseMessage(response);
	return responseMessage.sendSuccessMessage(statusCode, {
		message: resourceName + "_" + NOT_EXIST,
	});
};
