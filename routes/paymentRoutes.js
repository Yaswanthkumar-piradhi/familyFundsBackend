const router = require('express').Router();
const upload = require('../middleware/uploadMiddleware');
const { uploadPayment, getUserPayments } = require('../controllers/paymentController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, upload.single('screenshot'), uploadPayment);
router.get('/', verifyToken, getUserPayments);

module.exports = router;
