const nodemailer = require("nodemailer");
const jwtEmail = require("../utils/jwtEmail")
const User = require("../models/User")


exports.sendEmailConfirmation = async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
      },
    });


    const user = await User.findById(req.user.id, "email");
    
    const protocol = process.env.FRONTEND_PROTOCOL || "http";
    const frontendDomainName = process.env.FRONTEND_DOMAIN_NAME || "localhost";
    
    const token = jwtEmail.generateToken(req.user.id)
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Hello from Nodemailer",
      text: `email conf: ${protocol}://${frontendDomainName}/confirmation/${token}`,
    };
    
    
    await transporter.sendMail(mailOptions)
    

    res.json({
      success: true,
      result: {} 
    })

  } catch (err) {
    res.json({
      success: false,
      errors: err
    })
  }
}


exports.confirmEmail = async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.user.id, {
      isEmailConfirmed: true
    }, { new: true });


    res.json({
      success: true,
      result: result 
    })

  } catch (err) {
    res.json({
      success: false,
      errors: err
    })
  }
}



