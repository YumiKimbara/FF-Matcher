import axios from "axios";

const questionUrl = "https://ff-matcher-api.onrender.com/api/questions";
//   "http://localhost:3001/questions";
// "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/questions";
const resultUrl = "https://ff-matcher-api.onrender.com/api/result";
//   "http://localhost:3001/result";
// "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/result";

export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
