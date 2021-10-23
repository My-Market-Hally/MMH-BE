const mongoose = require('mongoose');

const { Schema } = mongoose;
const CartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  // date: {
  //   type: Date,
  //   required: true,
  // },
});

// PostSchema.virtual("postId").get(function () {
//   return this._id.toHexString();
// });
// PostSchema.set("toJSON", {
//   virtuals: true,
// });

module.exports = mongoose.model('Cart', CartSchema);
