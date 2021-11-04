const User = require('./user');
const Post = require('./post');
const Follow = require('./follow');
const Comment = require('./comment');
const Message = require('./message');

User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  constraints: false
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Message, {
  foreignKey: 'user_id',
});

Message.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Post, Follow, Comment, Message };
