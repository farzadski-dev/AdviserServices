const { ERROR, SOMETHING_WENT_WRONG } = require('./ErrorTemplates');

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require('../../../utils/debugger')(TAG);

class SendErrorInProduction {
	#error;
	#response;

	constructor(error, response) {
		this.#error = error;
		this.#response = response;
	}

	execute() {
		let statusCode = 500;
		let errorTemplate = {
			status: ERROR,
			errorMessage: SOMETHING_WENT_WRONG,
		};

		if (this.#error.isOperational) {
			statusCode = this.#error.statusCode;
			errorTemplate.status = this.#error.status;
			errorTemplate.errorMessage = this.#error.errorMessage;
		}

		this.#response.status(statusCode).json(errorTemplate);
	}
}

module.exports = SendErrorInProduction;
