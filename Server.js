const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
require("module-alias/register");
require("./src/utils/_Globals");

const PostgresDB = require("./src/database/PostgresDB"),
	SyncPostgresDB = require("./src/database/SyncPostgresDB"),
	AppListen = require("./App.Listen"),
	{ App } = require("./src");

class Server {
	async run() {
		new AppListen(new App().init()).listen();
		await new PostgresDB().connect();
		await new SyncPostgresDB().sync();
	}
}

(async () => {
	await new Server().run();
})();
