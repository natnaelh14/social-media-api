const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (e) {
      throw e;
    }
    return req;
  },
  signToken: function ({
    id,
    email,
    handle,
    avatar,
    gender,
    birth_date,
    bio,
    city,
    status,
    country,
    isActive,
    created_at,
    updated_at,
  }) {
    const payload = {
      id,
      email,
      handle,
      avatar,
      gender,
      birth_date,
      bio,
      city,
      status,
      country,
      isActive,
      created_at,
      updated_at,
    };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
