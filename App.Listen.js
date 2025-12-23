const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require('./src/utils/debugger')(TAG);

class AppListen {
	#expressApplication;

	/**
	 * @param expressApplication {module: express|e|Express}
	 */
	constructor(expressApplication) {
		this.#expressApplication = expressApplication;
	}

	listen() {
		const PORT = process.env.PORT || 3000;
		this.#expressApplication.listen(PORT, () => {
			myDebugger(`Listening on PORT: ${PORT}`);
		});
	}
}

module.exports = AppListen;
