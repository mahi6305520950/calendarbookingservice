
const service = require("../service/meeting.service");

exports.createMeeting = async (req, res, next) => {
  try {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (e) { next(e); }
};

exports.getMeetings = async (req, res, next) => {
  try {
    const meetings = await service.getMeetings(req.query);
    res.json(meetings);
  } catch (e) { next(e); }
};

exports.getMeeting = async (req, res, next) => {
  try {
    const meeting = await service.getMeetingById(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.json(meeting);
  } catch (e) { next(e); }
};

exports.updateMeeting = async (req, res, next) => {
  try {
    const meeting = await service.updateMeeting(req.params.id, req.body);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.json(meeting);
  } catch (e) { next(e); }
};

exports.deleteMeeting = async (req, res, next) => {
  try {
    const meeting = await service.deleteMeeting(req.params.id);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });
    res.status(204).send();
  } catch (e) { next(e); }
};
