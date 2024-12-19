import axios from "axios";
import { URLBASE } from "./urls.js";

const client = axios.create({
  baseURL: URLBASE,
  withCredentials: true,
});

export default client;
