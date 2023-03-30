import axios from "axios";

const newRequest = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
  /* headers: {
    Authorization: "bearer " + import.meta.env.USE TOKE NHERE,
  }, */
});

export default newRequest;
