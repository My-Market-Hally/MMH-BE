const Posts = require('../../schemas/post');
// const authMiddleware = require("../middlewares/authMW");

const getPostFunc = async (req, res) => {
  try {
    const post = await Posts.find({});
    res.json({ result: 'success', post: post });
  } catch (err) {
    res.status(400).send({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getPostFunc;
