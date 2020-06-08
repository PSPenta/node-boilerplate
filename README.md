# PRDXN Node API Boilerplate

## Installation Guide

### System Package Dependencies :-
 **Nodejs:** [Download](https://nodejs.org/en/download/)
_version:-_ `>= v10.16.3`

### Development Setup :-
1. Clone the repository  and install dependencies
	 ```bash
	 $ git clone https://github.com/prdxn/node-boilerplate.git  
	 $ npm install ( If wants to work with existing version of packages )  
	 $ npm run update:packages ( If wants to work with latest version of packages )  
	```	 
2. To start with database configuration create *.env* file from referencing the *env.example* file.  
	**For MongoDB install [Mongoose](https://mongoosejs.com/) package**
	```bash
	$ npm i -S mongoose
	```

	**For SQL DB install [Sequelize](https://sequelize.org/v5/) package**
	```bash
	$ npm i -S sequelize
	```

	**Sequelize supports multiple dialects for DBMS**
	**One of the following command with respect to database:** 
	```bash 
	$ npm install --save pg pg-hstore # Postgres  
	$ npm install --save mysql2  
	$ npm install --save mariadb  
	$ npm install --save sqlite3  
	$ npm install --save tedious # Microsoft SQL Server  
	```
3. To run tests
	```bash
	$ npm test
	```
4. Start the application
	```bash
	$ npm start
	```
