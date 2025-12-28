const IService = require("@Core/IService");

class GetAllUsersService extends IService {
	constructor(_container) {
		super();

		Object.assign(this, {
			_container,
		});
	}

	async Execute(input) {
		const { where, include, order, page, limit, offset } = input,
			{ data: users, paginationInfo } =
				await this._container.Utilities._paginator.Paginate({
					where,
					include,
					order,
					page,
					limit,
					offset,
				});

		return {
			users,
			paginationInfo,
		};
	}
}

module.exports = GetAllUsersService;
