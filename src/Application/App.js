const express = require('express');
const app = express();
const morgan = require('morgan');

const globalErrorHandler = require('../controllers/Error/ErrorController');
const AppError = require('../utils/AppError');

class App {
	init() {
		if (process.env.NODE_ENV === 'development') {
			app.use(morgan('dev'));
		}

		app.use(express.json({ limit: '10kb' }));
		require('../routes')(app);

		app.all('*', (request, response, next) => {
			return next(
				new AppError(
					`Can't find ${request.originalUrl} on this server.`,
					404
				)
			);
		});

		app.use(globalErrorHandler);
		return app;
	}
}

module.exports = App;
