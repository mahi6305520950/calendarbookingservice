
const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function hasConflict({ userId, startTime, endTime, excludeId }) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId ? { id: { [Op.ne]: excludeId } } : {}),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

exports.createMeeting = async (data) => {
  const conflict = await hasConflict(data);
  if (conflict) {
    const err = new Error("Time slot already booked");
    err.status = 400;
    throw err;
  }
  return Meeting.create(data);
};

exports.getMeetings = async (filters) => {
  return Meeting.findAll({ where: filters });
};

exports.getMeetingById = async (id) => {
  return Meeting.findByPk(id);
};

exports.updateMeeting = async (id, data) => {
  const conflict = await hasConflict({ ...data, excludeId: id });
  if (conflict) {
    const err = new Error("Time slot already booked");
    err.status = 400;
    throw err;
  }
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;
  return meeting.update(data);
};

exports.deleteMeeting = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;
  await meeting.destroy();
};
