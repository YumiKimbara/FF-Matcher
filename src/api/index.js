import axios from "axios";

//@@@このURLをブラウザに入力してエラーが返るならURLがおかしいということ
const url = "http://localhost:3001/questions";
const resultUrl = "http://localhost:3001/result";

export const fetchData = () => axios.get(url);
export const fetchResultData = () => axios.get(resultUrl);
