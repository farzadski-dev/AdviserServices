const jwt = require("jsonwebtoken"),
	IService = require("@Core/IService"),
	algorithm = "HS512";

class TokenService extends IService {
	constructor() {
		super();
	}

	async Execute(payload) {
		return new Promise((resolve, reject) => {
			jwt.sign(
				payload,
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
				},
			);
		});
	}
}

module.exports = TokenService;
