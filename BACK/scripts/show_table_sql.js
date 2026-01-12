'use strict';
(async ()=>{
  try{
    const { sequelize } = require('../db/models');
    const [rows] = await sequelize.query("SELECT sql FROM sqlite_master WHERE name='PerfilContenidos' AND type='table';");
    console.log('CREATE TABLE PerfilContenidos:');
    console.log(rows[0] && rows[0].sql ? rows[0].sql : 'no encontrado');
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();