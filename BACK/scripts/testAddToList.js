'use strict';
(async ()=>{
  try{
    const { Perfil, Contenido, sequelize } = require('../db/models');
    const perfiles = await Perfil.findAll();
    const contenidos = await Contenido.findAll();
    console.log('Perfiles:', perfiles.map(p => p.id));
    console.log('Contenidos:', contenidos.map(c => c.id));
    if (perfiles.length === 0 || contenidos.length === 0) return;
    const perfil = perfiles[0];
    const contenido = contenidos[0];
    console.log('Attempting addContenido...');
    await perfil.addContenido(contenido);
    console.log('Added OK');
    await sequelize.close();
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();