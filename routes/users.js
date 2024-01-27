var express = require("express");
var router = express.Router();
const User = require('../model/userModel')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gloshoecom@gmail.com',
    pass: 'xhde utfz jfib kmlw',
  },
});

/* GET users listing. */
router.get("/login", function (req, res) {
  res.render("index",{data:""});
});

router.get("/validate", (req, res) => {
  res.render("otpVerification",{message:""});
});

router.get("/home",(req,res)=> {
  res.render('home',{message:""})
})

let otpData = {
  otp: null,
  expirationTime: null
}

let reqBody;

router.post("/send", async (req, res) => {
  try {
    reqBody = req.body
    const {email} = reqBody;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      res.render('index', { data: "Email already exists" });
    } else {
      // Generate OTP
      otpData.otp = Math.floor(100000 + Math.random() * 900000);
      otpData.expirationTime = Date.now() + 60000;

      // Send OTP via email
      const mailOptions = {
        from: 'gloshoecom@gmail.com',
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for registration is ${otpData.otp}. Please use this for registration.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.render('index', { data: "Error sending OTP. Please try again." });
        } else {
          res.redirect('/validate');
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.render('index', { data: "Error processing registration. Please try again." });
  }
});

router.post("/otpEnter", async (req, res) => {

 const  {userName , email , number , password } = reqBody
  try {
    const { otp } = req.body;

    if (otpData.otp && Date.now() < otpData.expirationTime && otp === otpData.otp.toString()) {
      const newUser = new User({
        userName: userName,
        email: email,
        number: number,
        password: password,
      });

      await newUser.save();
      res.render('home', { message: "You are successfully logged in" });
    } else {
      res.render('otpVerification', { message: "Incorrect or expired OTP" });
    }
  } catch (error) {
    console.log(error);
    res.render('otpVerification', { message: "Error verifying OTP. Please try again." });
  }
});

router.get("/resend_otp", async (req, res) => {
  try {
    const { email } = reqBody;

    // Check if the user exists
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      // Generate and send a new OTP
      generateOTP();
      sendOTP(email);

      res.redirect('/validate');
    } else {
      res.render('index', { data: "Email already exists" });
    }
  } catch (error) {
    console.log(error);
    res.render('index', { data: "Error resending OTP. Please try again." });
  }
});

function generateOTP() {
  otpData.otp = Math.floor(100000 + Math.random() * 900000);
  otpData.expirationTime = Date.now() + 60000; // 60 seconds
}

function sendOTP(email) {
  const mailOptions = {
    from: 'gloshoecom@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for registration is ${otpData.otp}. Please use this for registration.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
}

module.exports = router ;