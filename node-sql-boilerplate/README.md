# PRDXN Node API Boilerplate

## Installation Guide

### System Package Dependencies :-
 **Nodejs:** [Download](https://nodejs.org/en/download/)
_version:-_ `>= v10.16.3`

 **One of the following command with respect to database:**  
$ npm install --save pg pg-hstore # Postgres  
$ npm install --save mysql2  
$ npm install --save mariadb  
$ npm install --save sqlite3  
$ npm install --save tedious # Microsoft SQL Server  

### Development Setup :-
1. Clone the repository  and install dependencies  
	 ```
	 $ git clone https://github.com/prdxn/node-boilerplate.git
	 ```
	 ```  
	 $ npm install ( If wants to work with existing version of packages )
	 $ npm run update:packages ( If wants to work with latest version of packages )
	 ```	 
2. Create Database in choosen DBMS.
3. Create a *.env* file which can be referenced from *.env.example* and provide environment variables.
4. To run tests
	```
	$ npm test
	```
5. Start the application
	```
	$ npm start
	```
