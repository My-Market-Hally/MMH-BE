const Cart = require('../../schemas/cart');

const ctrlCarts = {
  allCart: async (req, res) => {
    const { user } = res.locals;
    const userId = user.userId;
    try {
      const cartAllList = await Cart.find({ userId });
      return res.status(200).send({
        result: 'sucess',
        cartAllList: cartAllList,
        msg: '장바구니를 모두 불러왔습니다.',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        result: 'failure',
        msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  },

  addCart: async (req, res) => {
    const { postId } = req.params;
    const { user } = res.locals;
    const userId = user.userId;
    console.log(userId, postId, '유저, 포스트 아이디 확인용');
    const { title, price, img, quantity } = req.body;

    //예외처리 : swagger에서 잘못된 포스트아이디 값이 들어왔을 때,
    if(postId === '{postId}'){
      console.log(postId);
      console.log("postId값 오류로 인한 서버 튕김");
      return res.status(400).send({
        msg: "postId값이 입력되지 않았습니다."
      });
    };

    // 프론트와 어떤 정보를 주고받을 지 상의 필요

    // 장바구니에 담긴 물품에 대해 장바구니 담기를 눌렀을 때
      const isCart = await Cart.findOne({ userId, postId });
      console.log(isCart);
      if (isCart) {
        return res.status(400).send({
          result: 'failure',
          msg: '이미 장바구니에 담긴 물품입니다.',
          // 프론트에서 해당유저의 장바구니로 이동??
        });
      }

    // 언제 담은건지 알아두기 위한 값
    const date = new Date();

    try {
      const newCart = await Cart.create({
        userId,
        postId,
        title,
        price,
        img,
        quantity,
      });
      console.log(newCart, 'DB등록 완료');
      console.log(postId, 'vhtmxmdkdl');

      return res.status(200).send({
        result: 'success',
        msg: '장바구니에 정상적으로 등록되었습니다.',
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        result: 'failure',
        msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  },

  updateCart: async (req, res) => {
    const { quantity, postId } = req.body;
    console.log(quantity, postId);
    // console.log(res.locals.user);
    const userId = res.locals.user.userId;
    console.log(userId);

    // const { user } = res.locals;
    // const userId = user.userId;

    // 예외상황1: user에 장바구니에 postId가 없을때
    const targetCart = await Cart.findOne({ userId, postId });
    if(!targetCart){
      return res.status(400).send({
        msg: "본인의 장바구니에 담긴 상품이 아닙니다."
        // 스웨거를 작동시켜야만 만날 수 있는 에러
      });
    };

    // 예외 상황2 : 갯수 1개에서 0개로
    if (quantity == 0) {
      await Cart.deleteOne({
        userId,
        postId,
      });
      return res.status(200).send({
        result: 'success',
        msg: '해당 물품이 장바구니에서 삭제되었습니다.',
      });
    }

    const bfChgCart = await Cart.findOne({ userId, postId });
    // console.log(bfChgCart, 'Before Change');
    console.log(bfChgCart.quantity, 'Before Change Quantity');

    if (bfChgCart === null) {
      return res.status(400).send({
        result: 'failure',
        msg: '장바구니에 등록된 물품이 아닙니다.',
      });
    }

    try {
      await Cart.updateOne(
        {
          userId,
          postId,
        },
        {
          $set: {
            quantity,
          },
        }
      );
      const atChgCart = await Cart.findOne({ userId, postId });
      console.log(atChgCart.quantity, 'After Change Quantity');

      return res.status(200).send({
        result: 'success',
        quantity: atChgCart.quantity,
        msg: '수정이 완료되었습니다.',
      });
    } catch (error) {
      return res.status(400).send({
        result: 'failure',
        msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  },

  delCart: async (req, res) => {
    const { user } = res.locals;
    const userId = user.userId;
    const { postId } = req.body;

    const isCart = await Cart.findOne({ userId, postId });
    if (isCart === null) {
      return res.status(400).send({
        result: 'failure',
        msg: '장바구니에 등록된 물품이 아닙니다.',
      });
    }

    try {
      await Cart.deleteOne({ userId, postId });
      return res.status(200).send({
        result: 'success',
        msg: '해당 물품이 장바구니에서 삭제되었습니다.',
      });
    } catch {
      return res.status(400).send({
        result: 'failure',
        msg: '알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.',
      });
    }
  },
};

module.exports = ctrlCarts;
