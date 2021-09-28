import axios from "axios";

const questionUrl = "http://localhost:3001/questions";
const resultUrl = "http://localhost:3001/result";

export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
