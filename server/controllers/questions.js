const Questions = require("../models/questions.js");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();

    return res
      .status(200)
      .set("access-control-allow-origin", "https://ff-matcher.onrender.com")
      .json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
