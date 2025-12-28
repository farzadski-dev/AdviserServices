class IPaginator {
	/**
	 * @param {Object} options
	 * @param {number} options.page
	 * @param {number} options.limit
	 * @param {Object} options.where
	 * @param {Array} options.include
	 * @param {Array} options.order
	 * @return any
	 */
	Paginate(options) {
		throw new Error("NOT_IMPLEMENTED");
	}
}

module.exports = IPaginator;
