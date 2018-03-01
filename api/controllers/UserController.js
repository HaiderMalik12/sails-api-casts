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
      //validate the email and password
      const {email, password} = await Joi.validate(req.allParams(), schema);

      //create a new user
      const user = await User.create({
        email,
        password
      })
        .fetch();
      //send the new user in response
      return res.ok(user);
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
    return res.json({
      todo: 'login() is not implemented yet!'
    });
  }

};

