const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const PostgresDB = require("./PostgresDB");
const { sequelize } = new PostgresDB();

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require("../utils/debugger")(TAG);

class SyncPostgresDB {
	async sync() {
		try {
			await sequelize.sync({ alter: true });
			myDebugger("Sync is Done!");
		} catch (error) {
			myDebugger(error);
		}
	}
}

module.exports = SyncPostgresDB;
