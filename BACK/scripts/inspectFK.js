'use strict';
(async ()=>{
  try{
    const { sequelize } = require('../db/models');
    const tables = await sequelize.query("PRAGMA table_info('PerfilContenidos');");
    console.log('table_info PerfilContenidos:', JSON.stringify(tables[0], null, 2));
    const fks = await sequelize.query("PRAGMA foreign_key_list('PerfilContenidos');");
    console.log('foreign keys PerfilContenidos:', JSON.stringify(fks[0], null, 2));
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();