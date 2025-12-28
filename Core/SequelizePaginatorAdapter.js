class SequelizePaginatorAdapter {
	constructor(model) {
		this.model = model;
	}

	async FindAndCount({ limit, offset, where, include, order }) {
		return this.model.findAndCountAll({
			where,
			include,
			limit,
			offset,
			order,
			distinct: true,
		});
	}
}

module.exports = SequelizePaginatorAdapter;
