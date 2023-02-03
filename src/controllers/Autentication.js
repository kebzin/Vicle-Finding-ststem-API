const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const officers = require('../models/officers')


// register officer function
const registerOfficer = async (req, res, next) => {
    const content = req.body
    try {
        // checking if the user exist befor adding
        const Officers = await officers.findOne({ email: content.email })
        if (Officers) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(content.password, salt)

        // add the user to the database
        const newOfficer = new officers({

            firstName: content.firstName,
            lastName: content.lastName,
            middleName: content.middleName,
            email: content.email,
            password: hashedPassword,
            role: content.role,
            policestation: content.policestation,
            dateOfBirth: content.dateOfBirth,
            gender: content.gender,
            phone: content.phone,
            
        });
        await newOfficer.save()
        return res.status(201).json({ message: 'Officer added successfully'})
        
    } catch (error) {
        // if the user dident adde succesfully 
        console.log(error);
        next(error);
        return res.status(500).json({ message: error.message })
    
        
    }
}


// login function
const login = async (req, res, next)=>{

    const content = req.body
    try {
        // checking for the user befor alowing loin
        const Officers = await officers.findOne({ email: content.email})
            if (!Officers) {
                return res.status(400).json({ message: 'user not found' })
            }
            if(!Officers.password === content.password){
                return res.status(400).json({ message:'password does not match' })
            }
             
        const isMatch = await bcrypt.compare(content.password, Officers.password)
        if(!isMatch){
            return res.status(400).json({ message:'password does not match' })
        }
        const token = jwt.sign({ id: Officers._id }, 'secretkey')
            return res.cookie('access_token', token, {
                httOnly: true
            }).status(200).json({officer: Officers})

    }catch(e){
        console.log(e);
        next(e);
        return res.status(500).json({ message: e.message })
    }
}



// logout
const logout = async(req, res) => {
    try {
        
     await res.clearCookies("access_token", {
        secure: true,
        sameSite: 'none',
      }).status(200).json({message: 'Logout successful'});
    }catch (error) {
      console.log(error);
      return res.status(404).json(error.message)
    }
    
  }
module.exports = {registerOfficer, login, logout}