const express = require("express");
const router = express.Router()
const authCtrl = require('../controllers/authCtrl')
var cookieParser = require('cookie-parser')
router.use(cookieParser())

router.post('/register' , authCtrl.register)

router.post('/login' , authCtrl.login)

router.post('/logout' , authCtrl.logout)

router.post('/refresh_token' , authCtrl.generateAccessToken)


module.exports = router