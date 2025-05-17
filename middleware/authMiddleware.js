const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

exports.requireAdmin = (req, res, next) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Admins only' });
  next();
};
