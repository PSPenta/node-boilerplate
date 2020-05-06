# PRDXN Node API Boilerplate

## Installation Guide

### System Package Dependencies :-
 **Nodejs:** [Download](https://nodejs.org/en/download/)
_version:-_ `>= v10.16.3`

 **Mongodb Community Server**: [Download](https://www.mongodb.com/download-center/community)
_version:-_ `>= v4.0.13`

### Development Setup :-
1. Clone the repository  and install dependencies
	 ```
	 $ git clone https://github.com/prdxn/node-boilerplate.git
	 $ npm install ( If wants to work with existing version of packages )
	 $ npm run update:packages ( If wants to work with latest version of packages )
	```	 
2. Create a *.env* file which can be referenced from *.env.example* and provide environment variables.
3. To run tests
	```
	$ npm test
	```
4. Start the application
	```
	$ npm start
	```
