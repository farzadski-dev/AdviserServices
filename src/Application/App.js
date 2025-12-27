const express = require("express"),
	app = express(),
	morgan = require("morgan"),
	globalErrorHandler = require("../controllers/Error/ErrorController"),
	AppError = require("../utils/AppError");

class App {
	init() {
		if (process.env.NODE_ENV === "development") {
			app.use(morgan("dev"));
		}

		app.use(express.json({ limit: "10kb" }));
		require("../routes")(app);

		app.all("*", (rq, rs, nx) => {
			return nx(new AppError("NOT_FOUND", 404));
		});

		app.use(globalErrorHandler);
		return app;
	}
}

module.exports = App;
