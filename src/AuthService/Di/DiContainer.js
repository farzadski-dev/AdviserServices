const UserModel = require("../Models/UserModel"),
	UserRepositoryPostgreSQL = require("../Repositories/UserRepository.PostgreSQL");

const LoginService = require("../Services/Login.Service"),
	SingUpService = require("../Services/SingUp.Service"),
	AssignUserCategoryService = require("../Services/AssignUserCategory.Service"),
	DecodeTokenService = require("../Services/DecodeToken.Service"),
	ProtectByTokenService = require("../Services/ProtectByToken.Service"),
	ChangeUserRoleService = require("../Services/ChangeUserRole.Service"),
	SanitizeBearerTokenService = require("../Services/SanitizeBearerToken.Service"),
	TokenService = require("../Services/Token.Service"),
	GetAllUsersService = require("../Services/GetAllUsers.Service"),
	SequelizePaginatorAdapter = require("@Core/SequelizePaginatorAdapter"),
	Paginator = require("@Core/Paginator"),
	GenericQueryParser = require("@Core/GenericQueryParser");

let _container, _CategoryModel, _adapter, _paginator, _genericQueryParser;

module.exports = {
	/**
	 * @return {Sequelize.define|{}|*|{Models: {UserModel: Sequelize.define|{}, GetCategoryModel(): Sequelize.define|{}|*}, Repositories: {userRepository: *}, Services: {loginService: *, singUpService: *, assignUserCategoryService: *, decodeTokenService: DecodeTokenService, sanitizeBearerTokenService: SanitizeBearerTokenService, tokenService: TokenService, protectByTokenService: *}}}
	 */
	get() {
		if (!_container) {
			_adapter = new SequelizePaginatorAdapter(UserModel);
			_paginator = new Paginator(_adapter);

			_container = {
				Models: {
					UserModel,
					GetCategoryModel() {
						if (!_CategoryModel) {
							const { Category } = require("../../models");
							_CategoryModel = Category;
						}

						return _CategoryModel;
					},
				},

				Repositories: {
					userRepository: undefined,
				},

				Services: {
					loginService: undefined,
					singUpService: undefined,
					assignUserCategoryService: undefined,
					decodeTokenService: new DecodeTokenService(),
					sanitizeBearerTokenService: new SanitizeBearerTokenService(),
					tokenService: new TokenService(),
					protectByTokenService: undefined,
					changeUserRoleService: undefined,
					getAllUsersService: undefined,
				},

				Utilities: {
					_adapter,
					_paginator,
					/**
					 * @return {GenericQueryParser}
					 * @private
					 */
					_getGenericQueryParser() {
						if (!_genericQueryParser) {
							const { Category } = require("../../models");

							_genericQueryParser = new GenericQueryParser({
								allowedFields: ["role", "categoryId"],
								searchableFields: ["username"],
								sortableFields: ["createdAt", "username"],
								relations: [
									{
										model: Category,
										as: "belongs_category",
									},
								],
								defaultLimit: 10,
								maxLimit: 50,
							});
						}

						return _genericQueryParser;
					},
				},
			};

			_container.Repositories.userRepository = new UserRepositoryPostgreSQL(
				_container,
			);
			_container.Services.loginService = new LoginService(_container);
			_container.Services.singUpService = new SingUpService(_container);
			_container.Services.assignUserCategoryService =
				new AssignUserCategoryService(_container);
			_container.Services.protectByTokenService = new ProtectByTokenService(
				_container,
			);
			_container.Services.changeUserRoleService = new ChangeUserRoleService(
				_container,
			);
			_container.Services.getAllUsersService = new GetAllUsersService(
				_container,
			);
		}

		return _container;
	},
};
