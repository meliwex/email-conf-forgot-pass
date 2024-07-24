const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwtAuth = require("../utils/jwtAuth")


exports.signUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const obj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword 
    };
  
    const newUser = new User(obj);
    await newUser.save();

    const token = jwtAuth.generateToken(newUser._id)

    
    res.cookie('tk', token)

    res.status(201).json({
      success: true,
      result: newUser  
    })

  } catch (err) {
    res.json({
      success: false,
      errors: err
    })
  }
}



exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select("+password");

    
    const errMsg = "Incorrect email or password" 

    if(user === null){
      throw errMsg
    }
    
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if(isMatch === false) {
      throw errMsg
    }

    
    const token = jwtAuth.generateToken(user._id)
    
    res.cookie('tk', token)

    res.json({
      success: true,
      result: user  
    })

  } catch (err) {
    res.json({
      success: false,
      errors: err
    })
  }
}



