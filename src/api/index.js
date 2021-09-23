import axios from "axios";

// const userSignupUrl = "http://localhost:3001/signup";
// const userLoginUrl = "http://localhost:3001/login";

const sessionUrl = "http://localhost:3001/me";

const questionUrl = "http://localhost:3001/questions";
const resultUrl = "http://localhost:3001/result";

// export const fetchUserSignupUrl = () => axios.get(userSignupUrl);
// export const fetchUserLoginUrl = () => axios.get(userLoginUrl);
export const fetchQuestionsData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
export const fetchSessionData = () => axios.get(sessionUrl);
