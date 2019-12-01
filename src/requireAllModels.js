const allModelsFolder = [`${__dirname}/models`];
const fs = require('fs');

allModelsFolder.forEach(folder => {
 console.log("folder ", folder);
  fs.readdirSync(folder).forEach(file => {
    require(`${folder}/${file}`);
  });
});
