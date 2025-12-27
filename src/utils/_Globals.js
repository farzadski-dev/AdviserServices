"use strict";

const util = require("util");

global.echo = function echo(theData, TAG = "INFO") {
	if (
		process.env.HIDE_LOGGER === "FALSE" &&
		process.env.LOGGER_TAG.split(",").includes(TAG)
	) {
		const { parse } = require("./GetStackTrace"),
			parsedErr = parse(new Error())[1];

		console.log(
			util.inspect(
				{
					TAG: parsedErr?.fileName?.split("\\")[
						parsedErr?.fileName?.split("\\")?.length - 1
					],
					...theData,
					fileName: parsedErr.fileName.split("\\").slice(7).join("\\"),
					lineNumber: parsedErr.lineNumber,
					columnNumber: parsedErr.columnNumber,
				},
				{
					showHidden: false,
					depth: null,
					colors: true,
				},
			),
		);
	}
};

class Delay {
	#delayTime;

	/**
	 * @param delayTime {number} - delay time in milliseconds
	 */
	constructor(delayTime = 500) {
		this.#delayTime = delayTime;
	}

	async make() {
		await new Promise((resolve) => setTimeout(resolve, this.#delayTime));
	}
}

global._delay = async (delayTime) => {
	await new Delay(delayTime).make();
};

module.exports = {};
