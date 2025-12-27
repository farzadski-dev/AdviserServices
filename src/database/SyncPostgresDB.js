const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const PostgresDB = require("./PostgresDB"),
	{ sequelize } = new PostgresDB();

class SyncPostgresDB {
	async sync() {
		try {
			await sequelize.sync({ alter: true });
			echo({ message: "SYNC_IS_DONE" });
		} catch (error) {
			echo({ message: "SYNC_IS_NOT_SUCCESSFUL", error });
		}
	}
}

module.exports = SyncPostgresDB;
