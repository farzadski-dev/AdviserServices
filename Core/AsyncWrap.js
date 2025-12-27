const IAsyncWrap = require("./IAsyncWrap");

class AsyncWrap extends IAsyncWrap {
	Wrap(fn) {
		return (rq, rs, nx) => {
			Promise.resolve(fn(rq, rs, nx)).catch(nx);
		};
	}
}

module.exports = AsyncWrap;
