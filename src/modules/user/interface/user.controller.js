
const service = require("../service/user.service");

exports.createUser = async (req, res, next) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (e) { next(e); }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await service.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (e) { next(e); }
};
