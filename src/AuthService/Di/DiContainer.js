const UserModel = require("../Models/UserModel"),
	UserRepositoryPostgreSQL = require("../Repositories/UserRepository.PostgreSQL");

const LoginService = require("../Services/Login.Service"),
	SingUpService = require("../Services/SingUp.Service"),
	TokenService = require("../Services/Token.Service");

let _container;

module.exports = {
	get() {
		if (!_container) {
			_container = {
				Models: {
					UserModel,
				},

				Repositories: {
					userRepository: new UserRepositoryPostgreSQL(UserModel),
				},

				Services: {
					loginService: undefined,
					singUpService: undefined,
					tokenService: new TokenService(),
					getUserByPkService: undefined,
				},
			};

			_container.Services.loginService = new LoginService(_container);
			_container.Services.singUpService = new SingUpService(_container);
		}

		return _container;
	},
};
