const PostgresDB = require('../../../database/PostgresDB');
const { sequelize } = new PostgresDB();

const WorkTimeRoom = sequelize.define('work_times_rooms', {});

/**
 * @type {Sequelize.define<>}
 */
module.exports = WorkTimeRoom;
