const router = require('express').Router();
const { getAllPaymentsByMonth, markAsCompleted, getAllUsersWithPendingCounts } = require('../controllers/adminController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

router.get('/payments/:month', verifyToken, requireAdmin, getAllPaymentsByMonth);
router.patch('/complete/:paymentId', verifyToken, requireAdmin, markAsCompleted);
router.get('/users-pending', verifyToken, requireAdmin, getAllUsersWithPendingCounts);

module.exports = router;
