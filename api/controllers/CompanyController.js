module.exports = {

  create(req, res){
    let params = req.allParams();
    if (!params.name) {
      return res.badRequest({err: 'name is required field'});
    }
    Company.create({
      name: params.name,
      city: params.city,
      address: params.address
    }, (err, results) => {
      if (err) {
        return res.serverError(err);
      }
      return res.ok(results);
    });

  },
  find(req, res){

  },
  findOne(req, res){

  },
  update(req, res){

  },
  delete(req, res){

  }

};
