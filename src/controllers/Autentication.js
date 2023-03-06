const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const officers = require("../models/officers");
const dotenv = require("dotenv");

// register officer function
const registerOfficer = async (req, res, next) => {
  const content = req.body;
  try {
    // checking if the user exist befor adding
    const Officers = await officers
      .findOne({ email: content.email })
      .lean()
      .exec();
    if (Officers) {
      return res.status(409).json({
        message: `Your User Id could not be created because ${content.email} is no longer avelable. Please Choosed a new one`,
      }); // conflict with existing
    }

    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(content.password, salt);

    // add the user to the database
    const newOfficer = await officers.create({
      firstName: content.firstName,
      lastName: content.lastName,
      middleName: content.middleName,
      email: content.email,
      password: hashedPassword,
      role: content.role,
      PoliceStation: content.PoliceStation,
      dateOfBirth: content.dateOfBirth,
      gender: content.gender,
      PhoneNumber: content.PhoneNumber,
    });
    await newOfficer.save();
    res.status(201).json({
      message: `created "${newOfficer.email}". This email address will become your new User ID. it Cannot be change late`,
    });
  } catch (error) {
    // if the user dident adde succesfully
    console.log(error);
    next(error);
    return res.status(500).json({ message: error.message });
  }
};

// login function
const login = async (req, res, next) => {
  const content = req.body;
  try {
    // checking for the user befor alowing loin
    const Officers = await officers.findOne({ email: content.email }).exec();
    if (!Officers) {
      return res.status(401).json({ message: "user not found" }); // aunothreize
    }
    // check for user status
    if (Officers.status === "suspended") {
      return res.status(401).json({
        message:
          "This account  is suspended: Please contacted the administrator for more information.",
      }); // aunothreize
    }
    if (Officers.status === "pending") {
      return res.status(401).json({
        message:
          "This account is not being verified: Please contact the administrator for more information",
      }); // aunothreize
    }
    // evaluate password
    const isMatch = await bcrypt.compare(content.password, Officers.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password does not match" }); // unauthentication
    }

    // JWT authentication
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: Officers._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );
    // refresh token
    const refreshToken = jwt.sign(
      { id: Officers._id },
      process.env.Refresh_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //creat secure cookies
    res.cookie("jwt", refreshToken, {
      httpOnly: false,
      secure: false,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookies expiration in 7 days
    });

    // Send accessToke containing the user information
    res.json({ Officers, accessToken });

    // return res
    //   .cookie("access_token", token, {
    //     httOnly: true,
    //   })
    //   .status(200)
    //   .json({ message: "Login successfull.....!", officer: Officers });
  } catch (e) {
    console.log(e);
    next(e);
    return res.status(500).json({ message: e.message });
  }
};

// refresh token
const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" }); // TODO error message here if token is invalid or expired
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.Refresh_TOKEN_SECRET,
    async (error, decode) => {
      if (error) return res.status(403).json({ message: "forbidden" }); // TODO error message here if token is invalid or expired
      const foundUser = await officers.findOne({ id: decode._id });
      if (!foundUser) return res.status(403).json({ message: "Unauthorized" }); // refresh token will not be available if you are not not found
      const accessToken = jwt.sign(
        {
          userInfo: {
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({ accessToken });
    }
  );
};

// logout
const logout = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  try {
    if (!cookies?.jwt) return res.sendStatus(204); // not connected yet
    res.clearCookie("jwt", {
      httpOnly: false,
      sameSite: "None",
      secure: false,
    });
    res.json({ message: "cookies cleared" });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error.message);
  }
};
module.exports = { registerOfficer, login, logout, refresh };
