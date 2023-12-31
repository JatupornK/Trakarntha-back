const express = require("express");
const authController = require("../controller/authController");
const authenticateWithPassport = require('../middlewares/passportJwt');

const router = express.Router();

router.post("/login", authController.login);
router.post('/register', authController.createUser)
router.get('/me', authenticateWithPassport, authController.getUserData)
router.get('/cart/me', authenticateWithPassport, authController.getProductsInCart)

module.exports = router;
