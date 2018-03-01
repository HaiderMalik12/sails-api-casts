const bcrypt = require('bcrypt');
const SALT_ROUND = 10;
module.exports = {

  async hashPassword(password){
    return await bcrypt.hash(password, SALT_ROUND);
  },
  async comparePassword(password, hash){
    return await bcrypt.compare(password,hash);

  }
};
