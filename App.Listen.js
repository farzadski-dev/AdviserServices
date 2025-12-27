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
			echo({ message: "LISTENING_ON_PORT: " + PORT });
		});
	}
}

module.exports = AppListen;
