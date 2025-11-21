const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');
const { generateToken } = require('../services/tokenService');

const buildCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 3 * 24 * 60 * 60 * 1000,
});

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

console.log("Signup request received:", { name, email, role });
    if(!name || !email || !password){
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      })
    }
    

    const existingUser = await User.findOne({ email });
    console.log("Existing user check done");

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    console.log("User created:", user._id);

    const payload = { 
                      id: user._id, 
                      email: user.email,
                       role: user.role 
                    };

    const token = generateToken(payload);
    console.log("Token generated");

    res.cookie('token', token, buildCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        user: formatUser(user),
 
      },
    });


  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });

  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", { email, password });
    if(!email || !password){
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      })
    }
    console.log("Login request for:", email);
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      console.log("User not found");
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    console.log("User found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("Password incorrect");
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    console.log("Password correct");

    const payload = {  
                    id: user._id,
                    email: user.email,
                    role: user.role 
                  };

    const token = generateToken(payload);
    console.log("Token generated");

    res.cookie('token', token, buildCookieOptions());

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: formatUser(user),
      },
    
    });
    

  } catch (error) {
    console.log("Login Error:", error);
     return res.status(500).json({
      success: false,
      message: 'Server Error By ANIL',
    });
  }finally{
    console.log("I am finaly by login!")
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('token', buildCookieOptions());
  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });

};

