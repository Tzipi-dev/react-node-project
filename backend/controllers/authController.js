const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const login=async(req,res)=>{
    const {email, password}=req.body
    if (!email||!password)
        return res.status(400).json({message: "please fill all the required parameters"})
    const foundUser=await User.findOne({email}).lean()
    if (!foundUser)
        return res.status(401).json({message: "UnauthOrilized"})
    const match=await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({message: "UnauthOrilized"})
    const userInfo={_id: foundUser._id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone,password: foundUser.password}
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken, user:userInfo})
}
const register=async(req,res)=>{
    const {name,email,phone,_id, password}=req.body
    if (!name||!password||!email||!phone)
         return res.status(400).json({message: "please fill all the required parameters"})  
    const duplicate=await User.findOne({password}).lean()
    if (duplicate)
        return res.status(409).json({message: "duplicated user name"})
    const hashpwd=await bcrypt.hash(password,10)
    const userObject={name,email,phone,_id,password: hashpwd}
    const user=await User.create(userObject)
    if (!user)
      return res.status(400).json({message: "invalid user received"})
    const userInfo={_id: user._id, name: user.name, email: user.email, phone: user.phone,password: user.password}
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    return res.status(201).json({accessToken:accessToken, user:userInfo})
}
const registerUser = async (req, res, next) => {
    try {
        const result = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully' });
        const token = result.email.toString() + ' ' + result.password.toString();
        res.send(result);
        next();
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
};


const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Please provide an email address' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
  const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
  from: `"Support Team" <${process.env.EMAIL_FROM}>`,
  to: user.email,
  subject: 'Reset Your Password',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">Hi ${user.name || ''},</h2>
      <p style="font-size: 16px; color: #555;">
        We received a request to reset your password. Click the button below to proceed. This link will expire in 1 hour.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" style="background-color: #1976d2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #999;">
        If you didn’t request this, you can safely ignore this email.
      </p>
      <p style="font-size: 14px; color: #999;">Thanks,<br>The Support Team</p>
    </div>
  `,
});

  res.status(200).json({ message: 'Password reset link sent to email' });
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  console.log('Received token:', token);
  console.log('Received password:', password);
  if (!token || !password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(400).json({ message: 'Invalid or expired link' });
  }
};

module.exports = { login, register, registerUser, resetPassword, forgotPassword };