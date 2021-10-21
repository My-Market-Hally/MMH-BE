const Posts = require("../../schemas/post");
// const authMiddleware = require("../middlewares/authMW");

const postGoodsFunc = async (req, res, next) => {
    try {
        const {
          title,
          price,
          img,
          priceUnit,
          volume,
          delivery,
          origin,
          wrap,
          allergyInfo,
          expirationDate,
          regularArrival,
          warrantyExpirationDate,
          notification,
          productSelection,
          goodsQuantity,
        } = req.body;

        const existTitle = await Posts.findOne({ title });
        if(existTitle){
          res.status(400).send({
            errorMessage : "이미 존재하는 상품입니다."
          })
          return;
        }

        const uniqueUrl = await Posts.findOne({ img });
        if(uniqueUrl){
          res.status(400).send({
            errorMessage: '이미 존재하는 이미지 url입니다.',
          })
          return;
        }
  
        const newPost = await Posts.create({
          title,
          price,
          img,
          priceUnit,
          volume,
          delivery,
          origin,
          wrap,
          allergyInfo,
          expirationDate,
          regularArrival,
          warrantyExpirationDate,
          notification,
          productSelection,
          goodsQuantity,
        });
  
        console.log(newPost);
        res.send({ result: "success" });
      } catch (error) {
        return res.status(400).send({
          result: 'failure',
          msg: '상품명, 가격, 이미지는 필수 입력 항목입니다.',
        });
      }
};


module.exports = postGoodsFunc;
