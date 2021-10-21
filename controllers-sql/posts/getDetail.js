const Posts = require('../../schemas/post');
// const authMiddleware = require("../middlewares/authMW");

const getDetailFunc = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log(postId);
    const postDetail = await Posts.findOne({ _id: postId });
    console.log(postDetail);
    res.json({ result: 'success', detail: postDetail });
  } catch (err) {
    res.status(400).send({
      errorMessage: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
    });
  }
};

module.exports = getDetailFunc;
