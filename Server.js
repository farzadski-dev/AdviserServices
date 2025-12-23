const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const PostgresDB = require('./src/database/PostgresDB');
const SyncPostgresDB = require('./src/database/SyncPostgresDB');
const AppListen = require('./App.Listen');

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require('./src/utils/debugger')(TAG);

const { App } = require('./src');

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
