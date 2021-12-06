import axios from "axios";

const questionUrl =
  "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/questions";
const resultUrl =
  "http://ec2-35-183-29-247.ca-central-1.compute.amazonaws.com/api/result";

export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
