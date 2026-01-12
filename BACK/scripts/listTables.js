'use strict';
(async () => {
  try {
    const db = require('../db/models');
    const qi = db.sequelize.getQueryInterface();
    const tables = await qi.showAllTables();
    console.log('Tables:', tables);
    await db.sequelize.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();