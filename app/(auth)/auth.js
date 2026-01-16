

import axios from "axios";

export const UserRegister = async (full_name, email, password) => {
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, {
      full_name,
      email,
      password
    });

    console.log("Success:", res.data);
    return res.data;

  } catch (err) {

    if (err.response && err.response.data) {
      console.log("Backend Error:", err.response.data.message || err.response.data);
      return { error: err.response.data.message || "Unknown error from backend" };
    } else {
      console.log("Network / Axios Error:", err.message);
      return { error: err.message };
    }
  }
};





export const UserLogin = (email, password) => {
  return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/login`, { email, password }, {
    withCredentials: true
  })

}