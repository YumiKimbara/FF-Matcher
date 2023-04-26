import axios from "axios";

const questionUrl =
  // "http://localhost:3001/questions";
  "https://ff-matcher-api.onrender.com/questions";
// "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/questions";
const resultUrl =
  // "http://localhost:3001/result";
  "https://ff-matcher-api.onrender.com/result";
// "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/result";

export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
