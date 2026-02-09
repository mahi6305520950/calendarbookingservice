
const User = require("../model/user.model");

exports.createUser = async (data) => {
  return User.create(data);
};

exports.getUserById = async (id) => {
  return User.findByPk(id);
};
