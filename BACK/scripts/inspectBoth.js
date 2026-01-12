'use strict';
(async ()=>{
  try{
    const { sequelize } = require('../db/models');
    for(const t of ['PerfilContenidos','PerfilContenido']){
      const ti = await sequelize.query(`PRAGMA table_info('${t}');`);
      console.log('\nTable info', t, JSON.stringify(ti[0], null, 2));
      const fk = await sequelize.query(`PRAGMA foreign_key_list('${t}');`);
      console.log('FKs', t, JSON.stringify(fk[0], null, 2));
    }
    const tables = await sequelize.query("SELECT name, sql FROM sqlite_master WHERE type='table';");
    console.log('\nAll tables and sql: ', JSON.stringify(tables[0].map(r=>({name:r.name,sql:r.sql})), null, 2));
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();