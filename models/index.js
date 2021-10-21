const Sequelize = require("sequelize");
const User = require("./user");
const Cart = require("./cart");
const Post = require("./post");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;
db.Cart = Cart;

User.init(sequelize);
Post.init(sequelize);
Cart.init(sequelize);

User.associate(db);
Cart.associate(db);

module.exports = db;
