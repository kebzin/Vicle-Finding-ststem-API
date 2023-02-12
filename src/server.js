
const express = require('express')
const connect = require('./connect/connect')
const app = express()

const Register = require('./routers/Authentication')
const Fine = require('./routers/fine')
const officers = require('./routers/officers');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// middleware function
app.use('/api/auth', Register)
app.use('/api/fine', Fine)
app.use('/api/officers', officers)


 

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
