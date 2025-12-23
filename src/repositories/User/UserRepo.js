const Repo = require("../../core/Repo");

const { User } = require("../../models");

class UserRepo extends Repo {
	constructor() {
		super(User);
	}

	async IsThisPasswordCorrect(candidatePassword, userPassword) {
		return User.isThisPasswordCorrect(candidatePassword, userPassword);
	}
}

module.exports = new UserRepo();
