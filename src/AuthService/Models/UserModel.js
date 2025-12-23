const { DataTypes, Sequelize } = require("sequelize");
const bcrypt = require("bcryptjs");

const PostgresDB = require("../../database/PostgresDB");
const { sequelize } = new PostgresDB();

const TAG = `app:${__filename.slice(__dirname.length + 1, -3)}`;
const myDebugger = require("../../utils/debugger")(TAG);

const User = sequelize.define(
	"user",
	{
		id: {
			type: Sequelize.UUID,
			allowNull: false,
			primaryKey: true,
			defaultValue: new Sequelize.UUIDV4(),
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		role: {
			type: DataTypes.ENUM("admin", "adviser", "client"),
			defaultValue: "client",
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		indexes: [{ unique: true, fields: ["username"] }],
	}
);

User.beforeCreate(async (user, _options) => {
	user.password = await bcrypt.hash(user.password, 12);
});

/**
 * @type {Sequelize.define<>}
 */
module.exports = User;
