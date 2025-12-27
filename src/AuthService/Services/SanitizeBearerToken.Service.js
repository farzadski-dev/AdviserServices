const IService = require("@Core/IService"),
	{
		NotProvideBearerTokenException,
		NotLoggedInException,
	} = require("../../utils/exceptions");

class SanitizeBearerTokenService extends IService {
	constructor() {
		super();
	}

	/**
	 * @param input.bearerToken
	 * @return {*}
	 * @constructor
	 */
	Execute(input) {
		const { bearerToken } = input;
		return this.#checkIfBearerTokenIsExistAndStartWithBearer(bearerToken);
	}

	#checkIfBearerTokenIsExistAndStartWithBearer(bearerToken) {
		if (this.#checkBearerTokenExistAndStartWithBearer(bearerToken)) {
			return this.#splitBearerFromTokenAndSetSanitizedToken(bearerToken);
		} else {
			throw new NotProvideBearerTokenException();
		}
	}

	#checkBearerTokenExistAndStartWithBearer(bearerToken) {
		return bearerToken && bearerToken.startsWith("Bearer");
	}

	#splitBearerFromTokenAndSetSanitizedToken(bearerToken) {
		const sanitizedToken = bearerToken.split(" ")[1];

		if (!sanitizedToken) {
			throw new NotLoggedInException();
		}

		return sanitizedToken;
	}
}

module.exports = SanitizeBearerTokenService;
