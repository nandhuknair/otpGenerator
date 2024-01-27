// const User = require('../model/userModel')
// const nodemailer = require('../config/nodemailer')

// exports.signup = async (req,res)=>{
//     try {
//         const {userName, email , number , password } = req.body

//         const otp = Math.floor(1000 + Math.random() * 9000).toString();
//         const otpCreatedAt = new Date()
//         const otpExpiration = new Date(otpCreatedAt.getTime() + 60 * 1000);

// const newUser = new User({
//     userName,
//     email,
//     number,
//     password,
//     otp,
//     otpCreatedAt
// })

// await newUser.save();

// const mailOptions = {
//     from : process.env.EMAIL_USER,
//     to: email,
//     subject : 'OTP for email verification',
//     text: `Your otp is : ${otp}`
// }

// await nodemailer.sendMail(mailOptions)

//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Internal server Error')
//     }
// }


// // userController.js
// exports.resendOtp = async (req, res) => {
//     try {
//       const { email } = req.body;
//       const user = await User.findOne({ email });
  
//       if (user) {
//         // Generate a new OTP and update OTP creation time and expiration
//         const otp = Math.floor(1000 + Math.random() * 9000).toString();
//         const otpCreatedAt = new Date();
//         const otpExpiration = new Date(otpCreatedAt.getTime() + 60 * 1000); // 1 minute expiration
  
//         user.otp = otp;
//         user.otpCreatedAt = otpCreatedAt;
//         await user.save();
  
//         // Send the new OTP
//         const mailOptions = {
//           from: process.env.EMAIL_USER,
//           to: email,
//           subject: 'New OTP for Email Verification',
//           text: `Your new OTP is: ${otp}`,
//         };
  
//         await nodemailer.sendMail(mailOptions);
  
//         res.render('verify', { email, otpExpiration, msg: 'OTP resent successfully.' });
//       } else {
//         res.render('verificationFailed', { msg: 'User not found.' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   };
  