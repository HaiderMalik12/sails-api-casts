/**
 * JobController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * `JobController.create()`
   */
  create: async function (req, res) {
    try {
      let {title, description, salary, position} = req.allParams();
      if (!title) {
        return res.badRequest({err: 'title is required field'});
      }
      if(!salary){
        return res.badRequest({err: 'job salary is required field'});
      }
      const jobDetail = await JobDetail.create({
        description, salary, position
      }).fetch();
      const job = await Job.create({title, jobDetail: jobDetail.id}).fetch();
      return res.ok(job);
    }
    catch (err){
      return res.serverError(err);
    }
  },

  /**
   * `JobController.find()`
   */
  find: async function (req, res) {
    try{
      const jobs = await Job.find({where:{title: 'Nodejs developer'}}).populate('jobDetail');
      return res.ok(jobs);
    }
    catch (err){
      return res.serverError(err);
    }
  }

};

