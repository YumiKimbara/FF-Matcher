const Results = require("../models/results.js");

exports.getResults = async (req, res) => {
  try {
    const results = await Results.find();

    return res
      .status(200)
      .set(
        "Access-Control-Allow-Origin",
        "https://ff-matcher.onrender.com",
        "http://localhost:3000"
      )
      .set("Access-Control-Allow-Credentials", "true")
      .json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
