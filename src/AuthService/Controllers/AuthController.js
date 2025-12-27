const jwt = require("jsonwebtoken"),
	catchAsync = require("../../utils/catchAsync"),
	Helper = require("../../utils/Helper"),
	Controller = require("../../core/Controller");

class AuthController extends Controller {
	constructor(_container) {
		super();

		Object.assign(this, { _container });
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
		// const user = await User.update(
		// 	{
		// 		categoryId,
		// 	},
		// 	{
		// 		where: { id: userId },
		// 	},
		// );

		rs.status(200).json({
			status: "success",
			data: {
				user,
			},
		});
	});

	changeRoleOfThisUser = catchAsync(async (request, response, next) => {
		const { role, userId } = request.body;
		const user = await User.update(
			{
				role,
			},
			{
				where: { id: userId },
			},
		);

		response.status(200).json({
			status: "success",
			data: {
				user,
			},
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

	signToken = (id, role) => {
		return jwt.sign({ id, role }, process.env.OUR_JWT_SECRET, {
			expiresIn: process.env.OUR_JWT_EXPIRED_TIME,
			algorithm: "HS512",
		});
	};
}

module.exports = AuthController;
