'use strict';
(async ()=>{
  try{
    const { sequelize } = require('../db/models');
    const [rows] = await sequelize.query("SELECT sql FROM sqlite_master WHERE name='PerfilContenidos' AND type='table';");
    const sql = rows[0] && rows[0].sql ? rows[0].sql : '';
    console.log('CREATE TABLE SQL:\n', sql);
    const matches = sql.match(/REFERENCES/gi) || [];
    console.log('REFERENCES count:', matches.length);
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();