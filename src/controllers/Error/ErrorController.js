const BaseError = require("../../core/BaseError");
const SendErrorInProduction = require("./services/SendErrorInProduction");
const { MY_CUSTOM_EXCEPTION } = require("./services/ErrorTemplates");

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require("../../utils/debugger")(TAG);

const handleJWTExpired = (error) => {
	return new BaseError(error.message, 401);
};

const handleJWTMalformed = (error) => {
	return new BaseError(error.message, 401);
};

const handleSequelizeForeignKeyConstraintError = (error) => {
	return new BaseError(error.parent.detail, 404);
};

const handleInvalidUUIDError = (error) => {
	return new BaseError(error.parent.message, 400);
};

const handleSequelizeUniqueConstraintError = () => {
	return new BaseError("USERNAME_ALREADY_EXISTS", 409);
};

const handleOurCustomException = (error) => {
	return new BaseError(error.errorMessage, error.statusCode, error.name);
};

const sendErrorDev = (error, response) => {
	response.status(error.statusCode).json({
		status: error.status,
		error,
		message: error.message,
		stack: error.stack,
	});
};

module.exports = (error, request, response, _next) => {
	error.statusCode = error.statusCode || 500;
	error.status = error.status || "error";

	echo({ error });

	// console.log(error);

	// const _error = {
	//     error,
	//     headers: request.headers,
	// };

	// loggerForError.log({level: "error", message: _error});

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(error, response);
	} else if (process.env.NODE_ENV === "production") {
		let aCopyOfError = { ...error };
		const handlerForErrorWithNameMap = new Map([
			["TokenExpiredError", handleJWTExpired],
			["JsonWebTokenError", handleJWTMalformed],
			[MY_CUSTOM_EXCEPTION, handleOurCustomException],
		]);

		const errorHandlerForSequelizeMap = new Map([
			["23503", handleSequelizeForeignKeyConstraintError],
			["22P02", handleInvalidUUIDError],
			["23505", handleSequelizeUniqueConstraintError],
			["SequelizeUniqueConstraintError", handleSequelizeUniqueConstraintError],
		]);

		if (aCopyOfError?.name) {
			if (JSON.stringify(error.stack).includes("sequelize")) {
				aCopyOfError = errorHandlerForSequelizeMap.get(
					aCopyOfError.parent.code,
				)(aCopyOfError);
			} else {
				aCopyOfError = handlerForErrorWithNameMap.get(aCopyOfError.name)(
					aCopyOfError,
				);
			}
		}

		new SendErrorInProduction(aCopyOfError, response).execute();
	}
};
