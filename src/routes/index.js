/**
 * @param app {module: express}
 */
module.exports = (app) => {
	app.use('/', require('./api'));
};
