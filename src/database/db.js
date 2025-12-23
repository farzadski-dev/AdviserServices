const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRES_LOCAL_URL);
// (async () => {
//     try {
//         await sequelize.sync({force: true});
//     } catch (error) {
//         console.log(error);
//     }
// })();
module.exports = sequelize;