const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 5);
  return hash;
};

module.exports = hashPassword;
