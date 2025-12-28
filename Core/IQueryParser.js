class IQueryParser {
	Parse(_query) {
		throw new Error("IQueryParser.parse() must be implemented");
	}
}

module.exports = IQueryParser;
