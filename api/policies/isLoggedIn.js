module.exports = async function (req, res, next) {

  if (!req.headers || !req.headers.authorization) {
    return res.badRequest({err: 'authorization header is missing'});
  }
  const tokenParam = req.headers.authorization;
  const decodedToken = JWTService.verify(tokenParam);
  const user = await User.findOne({
    id: decodedToken.user
  });
  if (!user) {
    return next({err:'invalid credentials provided'});
  }
  req.user = user.id;
  next();
};
