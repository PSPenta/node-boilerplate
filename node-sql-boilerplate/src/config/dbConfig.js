//Bring in the sequelize module
const Sequelize = require('sequelize');
let { name, username, password, host, dialect } = require('./config').db;

//logging: false because sequelize by default log all DB activities in console which will unneccessarily flood the console.
let sequelize = new Sequelize(name, username, password, {
  host,
  dialect,
  logging: false
});

sequelize.authenticate().then(
  () => console.log(`Sequelize connection started on database "${name}" from "${dialect}"`),
  err => console.error(`Sequelize connection error: ${err}`)
);

process.on('SIGINT', function() {
  console.log('Sequelize disconnected through app termination');
  process.exit(0);
});

//Exported the database connection to be imported at the server
exports.default = sequelize;
