const UserModel = require("../Models/UserModel"),
	UserRepositoryPostgreSQL = require("../Repositories/UserRepository.PostgreSQL");

const LoginService = require("../Services/Login.Service"),
	SingUpService = require("../Services/SingUp.Service"),
	AssignUserCategoryService = require("../Services/AssignUserCategory.Service"),
	DecodeTokenService = require("../Services/DecodeToken.Service"),
	ProtectByTokenService = require("../Services/ProtectByToken.Service"),
	SanitizeBearerTokenService = require("../Services/SanitizeBearerToken.Service"),
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
					assignUserCategoryService: undefined,
					decodeTokenService: new DecodeTokenService(),
					sanitizeBearerTokenService: new SanitizeBearerTokenService(),
					tokenService: new TokenService(),
					protectByTokenService: undefined,
				},
			};

			_container.Services.loginService = new LoginService(_container);
			_container.Services.singUpService = new SingUpService(_container);
			_container.Services.assignUserCategoryService =
				new AssignUserCategoryService(_container);
			_container.Services.protectByTokenService = new ProtectByTokenService(
				_container,
			);
		}

		return _container;
	},
};
