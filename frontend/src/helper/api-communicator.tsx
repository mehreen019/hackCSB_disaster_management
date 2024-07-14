import axios from "axios";

export const loginadmin = async (email: string, password: string) => {
  const res = await axios.post("/admin_user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  const data = await res.data;
  return data;
};

export const signupadmin = async (
  username: string,
  email: string,
  password: string
) => {
    console.log(username);
  const res = await axios.post("/admin_user/signup", { username, email, password });
  if (res.status !== 200) {
    throw new Error("Unable to Signup ");
  }
  const data = await res.data;
  return data;
};
export const loginauthority = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:5000/api/authority_user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
  };
  
  export const signupauthority = async (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("reached api")
    const res = await axios.post("http://localhost:5000/api/authority_user/signup", { username, email, password });
    if (res.status !== 200) {
     throw new Error("Unable to Signup");
    }
    const data = await res.data;
    return data;
  };

/*export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};





export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  const data = await res.data;
  return data;
};*/