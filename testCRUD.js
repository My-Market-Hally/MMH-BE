const models = require('./models');

// CRUD 만들기
models.Users.create({
  userId: 'test888',
  email: 'test888@test.com',
  password: '1111',
  name: 'testEightEightEight',
}).then((result) => console.log('Data is Created!'));

// CRUD 찾기
models.Users.findAll().then(console.log);
models.Users.findOne({ where: { userId: 'test88' } }).then(console.log);

// CRUD 업데이트
models.Users.findOne({ where: { userId: 'test88' } }).then((target) => {
  console.log(target, 'if 전');
  if (target) {
    console.log(target, 'if 후');
    target
      .update({ userId: 'test888' })
      .then((result) => console.log('Data is updated!'));
  }
});

// CRUD 삭제
const targetUserId = "test888"
models.Users.destroy({ where: { userId: targetUserId } }).then((result) =>
  console.log(result,"결과"),
  console.log(`${targetUserId} data was deleted!`),
);


// db.Post.hasMany(db.Cart, { foreignKey: 'id', sourceKey: 'id'});
// db.Cart.belongsTo(db.Post, { foreignKey: 'id', targetKey: 'id'});