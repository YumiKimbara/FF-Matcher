import axios from "axios";

const url = "http://localhost:3001/questions";

export const fetchData = () => axios.get(url);
