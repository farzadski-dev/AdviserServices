const catchAsync = require("../../utils/catchAsync"),
	Helper = require("../../utils/Helper"),
	Controller = require("../../core/Controller"),
	GenericQueryParser = require("@Core/GenericQueryParser");

class AuthController extends Controller {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	SignUp = this.asyncWrap.Wrap(async (rq, rp, _nx) => {
		const { username, password, role } = rq.body,
			user = await this._container.Services.singUpService.Execute({
				username,
				password,
				role,
			});

		user.password = undefined;

		this.sendCreatedResponse(rp, {
			data: {
				user,
			},
		});
	});

	singUp = this.asyncWrap.Wrap(async (rq, rp, _next) => {
		const { username, password, role } = rq.body,
			user = await this._container.Services.singUpService.Execute({
				username,
				password,
				role,
			});

		this.sendCreatedResponse(rp, {
			data: {
				user,
			},
		});
	});

	login = this.asyncWrap.Wrap(async (rq, rp, _ne) => {
		const { username, password } = rq.body,
			{ user, token, tokenType } =
				await this._container.Services.loginService.Execute({
					username,
					password,
				});

		this.sendSuccessResponse(rp, {
			data: {
				user,
				token,
				tokenType,
			},
		});
	});

	protect = this.asyncWrap.Wrap(async (rq, rs, nx) => {
		const bearerToken = rq.headers.authorization;
		rq.user = await this._container.Services.protectByTokenService.Execute({
			bearerToken,
		});
		nx();
	});

	assignACategoryToThisUser = catchAsync(async (rq, rs, _nx) => {
		const { categoryId, userId } = rq.body,
			user = await this._container.Services.assignUserCategoryService.Execute({
				categoryId,
				userId,
			});

		this.sendSuccessResponse(rs, {
			data: {
				user,
			},
		});
	});

	changeRoleOfThisUser = catchAsync(async (request, response, next) => {
		const { role, userId } = request.body,
			user = await this._container.Services.changeUserRoleService.Execute({
				role,
				userId,
			});
		// const user = await User.update(
		// 	{
		// 		role,
		// 	},
		// 	{
		// 		where: { id: userId },
		// 	},
		// );

		this.sendSuccessResponse(rs, {
			data: {
				user,
			},
		});
		// response.status(200).json({
		// 	status: "success",
		// 	data: {
		// 		user,
		// 	},
		// });
	});

	GetAllUsers = this.asyncWrap.Wrap(async (rq, rs, _nx) => {
		const query = this._container.Utilities._getGenericQueryParser().Parse(
				rq.query,
			),
			{ users, paginationInfo } =
				await this._container.Services.getAllUsersService.Execute(query);

		this.sendSuccessResponse(rs, {
			data: {
				users,
			},
			paginationInfo,
		});
	});

	allowTo = (...roles) => {
		return (request, response, next) => {
			if (!Helper.arrayOfStringsContains(request.user.role, roles)) {
				return response.status(403).json({
					status: "failed",
					errorMessage: "You do not have permission to perform this action.",
				});
			}
			next();
		};
	};
}

module.exports = AuthController;
