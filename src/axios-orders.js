import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-mac-d.firebaseio.com/"
});

export default instance;
