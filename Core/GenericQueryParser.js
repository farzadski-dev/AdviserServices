const { Op } = require("sequelize"),
	IQueryParser = require("./IQueryParser");

class GenericQueryParser extends IQueryParser {
	constructor(config) {
		super();
		this.config = {
			defaultPage: 1,
			defaultLimit: 10,
			maxLimit: 100,
			...config,
		};
	}

	/**
	 * @param query
	 * @return {{where: {}, include: *[], order: *[], page: number|number, limit: number|number, offset: number}}
	 * @constructor
	 */
	Parse(query) {
		const where = {};
		const include = [];
		const order = [];

		/* =========================
			 Pagination
		========================= */
		let page = Number(query.page) || this.config.defaultPage;
		let limit = Number(query.limit) || this.config.defaultLimit;

		if (page < 1) page = this.config.defaultPage;
		if (limit < 1) limit = this.config.defaultLimit;
		if (limit > this.config.maxLimit) limit = this.config.maxLimit;

		const offset = (page - 1) * limit;

		/* =========================
			 Auto-map simple fields
		========================= */
		for (const field of this.config.allowedFields || []) {
			if (query[field] !== undefined) {
				where[field] = query[field];
			}
		}

		/* =========================
			 Search (multi-field)
		========================= */
		if (query.search && this.config.searchableFields?.length) {
			where[Op.or] = this.config.searchableFields.map((field) => ({
				[field]: { [Op.iLike]: `%${query.search}%` },
			}));
		}

		/* =========================
			 Sorting
		========================= */
		if (query.sort) {
			const [field, dir = "asc"] = query.sort.split(":");
			if (this.config.sortableFields?.includes(field)) {
				order.push([field, dir.toUpperCase()]);
			}
		}

		/* =========================
			 Relation filters
		========================= */
		for (const rel of this.config.relations || []) {
			const relWhere = {};

			if (rel?.allowedFields) {
				for (const field of rel.allowedFields) {
					const key = `${rel.name}.${field}`;
					if (query[key] !== undefined) {
						relWhere[field] = query[key];
					}
				}
			}

			include.push({
				model: rel.model,
				as: rel.as,
				where: Object.keys(relWhere).length ? relWhere : undefined,
				required: Object.keys(relWhere).length > 0,
			});
		}

		return {
			where,
			include,
			order,

			page,
			limit,
			offset,
		};
	}
}

module.exports = GenericQueryParser;
