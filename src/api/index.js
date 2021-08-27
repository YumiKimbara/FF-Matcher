import axios from "axios";

//@@@このURLをブラウザに入力してエラーが返るならURLがおかしいということ
const url = "http://localhost:3001/questions";

export const fetchData = () => axios.get(url);
