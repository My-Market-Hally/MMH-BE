const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth-middleware');
//const signUpFunc = require('../controllers/user/signUp');
//const userFunc = require('../controllers/user/logIn');

const signUpFunc = require('../controllers-sql/user/signUp');
const userFunc = require('../controllers-sql/user/logIn');


//회원가입
router.post('/users/signUp', signUpFunc.signUp);

//ID 중복확인
router.post('/users/checkDup', signUpFunc.checkDup);

//로그인
router.post('/users/login', userFunc.logInFunc);

//로그인 인증
router.get('/users/me', authMiddleware, userFunc.authorization);

module.exports = router;
