const jwt = require('jsonwebtoken');

const algorithm = 'HS512';

class Token {
	#payload;

	/**
	 *
	 * @param payload {Object.<{id: string, role: 'admin' | 'adviser' | 'client'}>}
	 */
	constructor(payload) {
		this.#payload = payload;
	}

	async sign() {
		return new Promise((resolve, reject) => {
			jwt.sign(
				this.#payload,
				process.env.OUR_JWT_SECRET,
				{
					expiresIn: process.env.OUR_JWT_EXPIRED_TIME,
					algorithm,
				},
				function (err, token) {
					if (err) {
						reject(err);
					}

					resolve(token);
				}
			);
		});
	}
}

module.exports = Token;
