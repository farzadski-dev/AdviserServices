const { Sequelize } = require("sequelize");

class PostgresDB {
	sequelize;

	/**
	 * @returns Sequelize
	 */
	constructor() {
		const _instance = this.constructor._instance;
		if (_instance) {
			return _instance;
		}

		this.sequelize = new Sequelize(
			process.env.POSTGRES_LOCAL_DATABASE,
			process.env.POSTGRES_DATABASE_USERNAME,
			process.env.POSTGRES_DATABASE_PASSWORD,
			{
				dialect: process.env.POSTGRES_DIALECT,
				port: 5432,
				logging: false,
			},
		);
		this.constructor._instance = this;
	}

	async connect() {
		try {
			await this.sequelize.authenticate();
			echo({ message: "CONNECTION_HAS_BEEN_ESTABLISHED_SUCCESSFULLY" });
		} catch (error) {
			echo({ message: "UNABLE_TO_CONNECT_TO_THE_DATABASE", error });
		}
	}
}

module.exports = PostgresDB;
