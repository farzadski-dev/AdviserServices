const { Sequelize } = require("sequelize");

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require("../utils/debugger")(TAG);

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

		myDebugger(process.env.POSTGRES_HOST);

		this.sequelize = new Sequelize(
			process.env.POSTGRES_LOCAL_DATABASE,
			process.env.POSTGRES_DATABASE_USERNAME,
			process.env.POSTGRES_DATABASE_PASSWORD,
			{
				dialect: process.env.POSTGRES_DIALECT,
				port: 5432,
				logging: false,
			}
		);
		this.constructor._instance = this;
	}

	async connect() {
		try {
			await this.sequelize.authenticate();
			myDebugger("Connection has been established successfully.");
		} catch (error) {
			myDebugger("Unable to connect to the database:", error);
		}
	}
}

module.exports = PostgresDB;
