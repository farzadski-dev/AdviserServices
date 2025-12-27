const jwt = require("jsonwebtoken"),
	{ promisify } = require("util"),
	IService = require("@Core/IService");

class DecodeTokenService extends IService {
	constructor() {
		super();
	}

	/**
	 * @param input.token
	 * @return {Promise<unknown>}
	 * @constructor
	 */
	async Execute(input) {
		const { token } = input;

		return promisify(jwt.verify)(token, process.env.OUR_JWT_SECRET);
	}
}

module.exports = DecodeTokenService;
