const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  
  const token = authHeader.startsWith('Bearer ')? authHeader.split(' ')[1] : req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Authentication token missing',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    return next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

 