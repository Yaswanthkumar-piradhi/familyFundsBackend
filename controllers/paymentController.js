const Payment = require('../models/Payment');
const cloudinary = require('../utils/cloudinary');

exports.uploadPayment = async (req, res) => {
  const { month, reason } = req.body;
  const user = req.userId;

  const exists = await Payment.findOne({ user, month });
  if (exists) return res.status(400).json({ message: 'Already paid this month' });

  const result = await cloudinary.uploader.upload_stream({ resource_type: 'image' }, async (error, result) => {
    if (error) return res.status(500).json({ message: 'Cloudinary error' });
    const payment = await Payment.create({
      user,
      month,
      reason,
      screenshotUrl: result.secure_url,
    });
    res.json(payment);
  });

  req.pipe(result);
};

exports.getUserPayments = async (req, res) => {
  const payments = await Payment.find({ user: req.userId });
  res.json(payments);
};
