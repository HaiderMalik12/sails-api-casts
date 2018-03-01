/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Joi = require('joi');
module.exports = {
  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} = await Joi.validate(req.allParams(), schema);
      const encryptedPassword = await UtilService.hashPassword(password);
      const results = await User.create({
        email,
        password: encryptedPassword
      });
      return res.ok(results);
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err});
      }
      return res.serverError(err);
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    try {
      const schema = Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required()
      });
      const {email, password} = await Joi.validate(req.allParams(), schema);
      const user = await User.findOne({email});
      if(!user){
        return res.notFound({err: 'user does not exist'});
      }
      const matchedPassword = await UtilService.comparePassword(password, user.password);
      if(!matchedPassword){
        return res.badRequest({err: 'unauthorized'});
      }
      const token = JWTService.issuer({user: user.id}, '1 day');
      return res.ok({token});

    }
    catch (err) {
      if (err.name === 'ValidationError') {
        return res.badRequest({err});
      }
      return res.serverError(err);
    }
  }

};

