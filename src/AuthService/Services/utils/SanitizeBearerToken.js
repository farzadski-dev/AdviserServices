const {
	NotProvideBearerTokenException,
	NotLoggedInException,
} = require("../../../utils/exceptions");

class SanitizeBearerToken {
	#bearerToken;

	#sanitizedToken;

	constructor(bearerToken) {
		this.#bearerToken = bearerToken;
	}

	execute() {
		this.#checkIfBearerTokenIsExistAndStartWithBearer();
		return this.#sanitizedToken;
	}

	#checkIfBearerTokenIsExistAndStartWithBearer() {
		if (this.#checkBearerTokenExistAndStartWithBearer()) {
			this.#splitBearerFromTokenAndSetSanitizedToken();
		} else {
			throw new NotProvideBearerTokenException();
		}
	}

	#checkBearerTokenExistAndStartWithBearer() {
		return this.#bearerToken && this.#bearerToken.startsWith("Bearer");
	}

	#splitBearerFromTokenAndSetSanitizedToken() {
		this.#sanitizedToken = this.#bearerToken.split(" ")[1];
		if (!this.#sanitizedToken) {
			throw new NotLoggedInException();
		}
	}
}

module.exports = SanitizeBearerToken;
