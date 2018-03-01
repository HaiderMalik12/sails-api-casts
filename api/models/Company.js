module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    city: {
      type: 'string'
    },
    address: {
      type: 'string'
    },

    //Assocication
    jobs: {
      collection: 'Job',
      via: 'company'
    },
    user:{
      model: 'user',
      columnName: 'userId',
      required:true
    }
  }
};
