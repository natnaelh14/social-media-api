const User = require('./user');
const Post = require('./post');
const Follow = require('./follow');
const Comment = require('./comment');
const Message = require('./message');
const Reaction = require('./reaction');
const Hashtag = require('./hashtag');
const Crypto = require('./crypto');
const FriendRequest = require('./friendRequest');

//POST
User.hasMany(Post, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
});

Post.belongsTo(User, { as: 'user'});

Post.hasMany(Comment, {
  foreignKey: {
    name: 'post_id',
    allowNull: false,
  },
  hooks: true,
  onDelete: 'cascade'
});

//COMMENT
Comment.belongsTo(Post, { as: 'post'})

User.hasMany(Comment, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
})

Comment.belongsTo(User, { as: 'user'});

User.hasMany(Message, {
  foreignKey: 'user_id',
});

//REACTION
User.hasMany(Reaction, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
})

Reaction.belongsTo(User, { as: 'user'});

Post.hasMany(Reaction, {
  foreignKey: {
    name: 'post_id',
    allowNull: false,
  },
  hooks: true,
  onDelete: 'cascade'
})

Reaction.belongsTo(Post, { as: 'post'});

Comment.hasMany(Reaction, {
  foreignKey: {
    name: 'comment_id',
    allowNull: false,
  },
})

Reaction.belongsTo(Comment, { as: 'comment'});

//CRYPTO
User.hasMany(Crypto, {
  foreignKey: {
    name: 'user_id',
    allowNull: false,
  },
})

Crypto.belongsTo(User, { as: 'user'});


module.exports = {
  User,
  Post,
  Follow,
  Comment,
  Message,
  Reaction,
  Hashtag,
  Crypto,
  FriendRequest,
};
