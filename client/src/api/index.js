import axios from "axios";

const questionUrl =
  "http://ec2-3-99-140-59.ca-central-1.compute.amazonaws.com/api/questions";
const resultUrl =
  "http://ec2-3-99-140-59.ca-central-1.compute.amazonaws.com/api/result";

export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
