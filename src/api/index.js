import axios from "axios";

//@@@このURLをブラウザに入力してエラーが返るならURLがおかしいということ
const userSignupUrl = "http://localhost:3001/signup";
const userLoginUrl = "http://localhost:3001/login";

const questionUrl = "http://localhost:3001/questions";
const resultUrl = "http://localhost:3001/result";

export const fetchUserSignupUrl = () => axios.get(userSignupUrl);
export const fetchUserLoginUrl = () => axios.get(userLoginUrl);
export const fetchData = () => axios.get(questionUrl);
export const fetchResultData = () => axios.get(resultUrl);
