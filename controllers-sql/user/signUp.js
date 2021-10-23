const bcrypt = require('bcrypt');
const signUp = require('../../schemas/joi');
// const User = require('../../schemas/user');
const models = require('../../models');

exports.signUp = async (req, res) => {
  try {
    let { email } = await signUp.emailSchema.validateAsync(req.body);
    let existemail = await models.Users.findById({ email });
    console.log(existemail);
    if (existemail.length) {
      return res.status(406).send({
        errorMessage: '이미 사용중인 email입니다.',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({
      msg: '형식에 맞지 않는 이메일입니다.',
    });
    return;
  }
  try {
    await signUp.passwordSchema.validateAsync(req.body);
  } catch (err) {
    console.log(err);
    res.status(407).send({
      msg: 'password는 3자리 이상 20자리이하만 입력 가능합니다.',
    });
    return;
  }
  try {
    let { userId, email, password, passwordConfirm, name } =
      await signUp.signUpSchema.validateAsync(req.body);
    console.log('1');
    if (password !== passwordConfirm) {
      return res.status(400).send({
        msg: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
      });
    }
    console.log('2');
    const encryptedPassword = bcrypt.hashSync(password, 10);

    await models.Users.create({ userId, email, password: encryptedPassword, name });
    console.log('3');
    res.status(201).send({ result: 'success', msg: '회원가입을 환영합니다.' });
  } catch (err) {
    console.log(err);
    res.status(402).send({
      msg: 'ID, email, password, name은 필수 입력 항목입니다.',
    });
  }
};

exports.checkDup = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = await signUp.userIdSchema.validateAsync(req.body);
    const existUsers = await models.Users.findById({ userId });
    if (existUsers.length) {
      res.status(400).send({
        errorMessage: '이미 사용중인 ID입니다.',
      });
    } else {
      res.status(200).send({
        message: '사용가능한 ID입니다.',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).send({
      msg: 'ID는 3자리 이상 20자리 이하여야 합니다.(특수문자 사용불가)!',
    });
  }
};
