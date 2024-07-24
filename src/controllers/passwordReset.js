const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwtPasswordReset = require("../utils/jwtPasswordReset")
const User = require("../models/User")


exports.sendPasswordReset = async (req, res) => {
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


    const user = await User.findOne({ email: req.body.email });
   

    if(user){
      const protocol = process.env.FRONTEND_PROTOCOL || "http";
      const frontendDomainName = process.env.FRONTEND_DOMAIN_NAME || "localhost";
      
      const token = jwtPasswordReset.generateToken(user._id)
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Hello from Nodemailer",
        text: `${protocol}://${frontendDomainName}/reset/${token}`,
      };
      
      
      await transporter.sendMail(mailOptions)
    }
    

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


exports.resetPassword = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await User.findByIdAndUpdate(req.user.id, {
      password: hashedPassword 
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
