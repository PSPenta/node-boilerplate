// User define DB Creadentials
var dbCredentials = require('./config').db;

if (dbCredentials.url && dbCredentials.name) {
  //Bring in the mongoose module
  const mongoose = require('mongoose');

  var dbURI = dbCredentials.url + dbCredentials.name;

  //console to check what is the dbURI refers to
  console.log('Database URL is => ', dbURI);

  //Open the mongoose connection to the database
  mongoose.connect(dbURI, {
    config: {
      autoIndex: false,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Db Connection
  let db = mongoose.connection;

  db.on('connected', function () {
    console.log('Mongoose connected to ' + dbURI);
  });

  db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
  });

  db.on('disconnected', function () {
    console.log('Mongoose disconnected');
  });

  process.on('SIGINT', function () {
    db.close(function () {
      console.log('Mongoose disconnected through app termination');
      process.exit(0);
    });
  });

  //Exported the database connection to be imported at the server
  exports.default = db;
} else if (
  dbCredentials.name &&
  dbCredentials.username &&
  dbCredentials.password &&
  dbCredentials.dialect &&
  dbCredentials.host &&
  dbCredentials.port
) {
  //Bring in the sequelize module
  const Sequelize = require('sequelize');
  let { name, username, password, host, port, dialect } = dbCredentials;

  //logging: false because sequelize by default log all DB activities in console which will unneccessarily flood the console.
  let sequelize = new Sequelize(name, username, password, {
    host,
    port,
    dialect,
    logging: false,
  });

  sequelize.authenticate().then(
    () =>
      console.log(
        `Sequelize connection started on database "${name}" from "${dialect}"`
      ),
    (err) => console.error(`Sequelize connection error: ${err}`)
  );

  process.on('SIGINT', function () {
    console.log('Sequelize disconnected through app termination');
    process.exit(0);
  });

  //Exported the database connection to be imported at the server
  exports.default = sequelize;
} else {
  console.log('\x1b[33m%s\x1b[0m','-> Application is running without database connection!');
}
