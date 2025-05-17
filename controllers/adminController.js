const Payment = require('../models/Payment');
const User = require('../models/User');

exports.getAllPaymentsByMonth = async (req, res) => {
  const { month } = req.params;
  const payments = await Payment.find({ month }).populate('user', 'name phone');
  res.json(payments);
};

exports.markAsCompleted = async (req, res) => {
  const { paymentId } = req.params;
  const updated = await Payment.findByIdAndUpdate(paymentId, { status: 'completed' }, { new: true });
  res.json(updated);
};

exports.getAllUsersWithPendingCounts = async (req, res) => {
  const users = await User.find();
  const results = [];

  for (let user of users) {
    const paidMonths = await Payment.find({ user: user._id });
    const uniqueMonths = new Set(paidMonths.map(p => p.month));
    results.push({
      name: user.name,
      phone: user.phone,
      paidMonths: [...uniqueMonths],
    });
  }

  res.json(results);
};
