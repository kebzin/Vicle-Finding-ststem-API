
const express = require('express')
const connect = require('./connect/connect')
const app = express()



// Connect to Database
void (async () => { // void function does not return any value , it mean that the function does cannot be stored in a variable 
    try {
      await connect(); 
      console.log('connected to database'); // if connect is true then succesfully connected
    } catch (error) {
      console.log('error connecting to database:', error.message); // else if connect is false tell my why
    }
  })();

module.exports = app
