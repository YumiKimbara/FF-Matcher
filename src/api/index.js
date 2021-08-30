import axios from "axios";

//@@@このURLをブラウザに入力してエラーが返るならURLがおかしいということ
const userSignupUrl = "http://localhost:3001/signup";
const userLoginUrl = "http://localhost:3001/login";

// const sessionUrl = "http://localhost:3001/";
const questionUrl = "http://localhost:3001/questions";
const resultUrl = "http://localhost:3001/result";

export const fetchUserSignupUrl = () => axios.get(userSignupUrl);
export const fetchUserLoginUrl = () => axios.get(userLoginUrl);
// export const fetchSessionUrl = () => axios.get(sessionUrl);
export const fetchData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
