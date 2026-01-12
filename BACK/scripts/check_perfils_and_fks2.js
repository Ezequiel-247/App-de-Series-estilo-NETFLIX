'use strict';
(async ()=>{
  try{
    const { sequelize } = require('../db/models');
    const [tbl] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='Perfils';");
    console.log('Perfils exists:', tbl.length > 0);
    const [fks] = await sequelize.query("PRAGMA foreign_key_list('PerfilContenidos');");
    console.log('foreign keys rows count:', fks.length);
    console.log(JSON.stringify(fks, null, 2));
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();