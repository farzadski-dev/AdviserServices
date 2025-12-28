const IPaginator = require("./IPaginator");

class Paginator extends IPaginator {
	constructor(adapter) {
		super();
		this.adapter = adapter;
	}

	async Paginate({
		page = 1,
		limit = 10,
		offset = 10,
		where = {},
		include = [],
		order = [["createdAt", "DESC"]],
	}) {
		page = Number(page);
		limit = Number(limit);

		if (page < 1) page = 1;
		if (limit < 1) limit = 10;

		const { rows, count } = await this.adapter.FindAndCount({
			limit,
			offset,
			where,
			include,
			order,
		});

		const totalPages = Math.ceil(count / limit);

		return {
			data: rows,
			paginationInfo: {
				totalItems: count,
				totalPages,
				currentPage: page,
				perPage: limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
				nextPage: page < totalPages ? page + 1 : null,
				prevPage: page > 1 ? page - 1 : null,
			},
		};
	}
}

module.exports = Paginator;
