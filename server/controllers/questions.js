const Questions = require("../models/questions.js");

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Questions.find();

    return res
      .status(200)
      .set(
        "Access-Control-Allow-Origin",
        "https://ff-matcher.onrender.com"
        // "http://localhost:3000"
      )
      .set("Access-Control-Allow-Credentials", "true")
      .json(questions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
