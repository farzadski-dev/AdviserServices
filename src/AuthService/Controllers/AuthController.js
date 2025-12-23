const jwt = require("jsonwebtoken"),
	catchAsync = require("../../utils/catchAsync"),
	Helper = require("../../utils/Helper"),
	SanitizeBearerToken = require("../Services/utils/SanitizeBearerToken"),
	DecodeToken = require("../Services/decodeToken/DecodeToken.Service"),
	GetUserByPk = require("../Services/common/GetUserByPk"),
	{ ThisUserIsNotExistException } = require("../../utils/exceptions"),
	Controller = require("../../core/Controller");

class AuthController extends Controller {
	constructor(_container) {
		super();

		Object.assign(this, { _container });
	}

	singUp = this.catchAsync(async (rq, rp, _next) => {
		const { username, password, role } = rq.body,
			user = await this._container.Services.singUpService.execute({
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

	login = catchAsync(async (rq, rp, _next) => {
		const { username, password } = rq.body;

		const { user, token, tokenType } =
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

	protect = catchAsync(async (request, response, next) => {
		const token = new SanitizeBearerToken(
			request.headers.authorization
		).execute();

		const decodedToken = await new DecodeToken(token).execute();

		const freshUser = await new GetUserByPk(decodedToken.id).execute();

		if (!freshUser) {
			throw new ThisUserIsNotExistException();
		}

		request.user = freshUser;
		next();
	});

	assignACategoryToThisUser = catchAsync(async (request, response, next) => {
		const { categoryId, userId } = request.body;
		const user = await User.update(
			{
				categoryId,
			},
			{
				where: { id: userId },
			}
		);

		response.status(200).json({
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
			}
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
