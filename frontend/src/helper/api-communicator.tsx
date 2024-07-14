import axios from "axios";

export const loginadmin = async (email: string, password: string) => {
  const res = await axios.post("/admin_user/login", { email, password });
<<<<<<< HEAD
<<<<<<< HEAD
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
=======
  ///if (res.status !== 200) {
   // throw new Error("Unable to login");
 // }
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
=======
  ///if (res.status !== 200) {
   // throw new Error("Unable to login");
 // }
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
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
<<<<<<< HEAD
<<<<<<< HEAD
  if (res.status !== 200) {
    throw new Error("Unable to Signup ");
  }
=======
 // if (res.status !== 201) {
  //  throw new Error("Unable to Signup ");
  //}
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
=======
 // if (res.status !== 201) {
  //  throw new Error("Unable to Signup ");
  //}
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
  const data = await res.data;
  return data;
};
export const loginauthority = async (email: string, password: string) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const res = await axios.post("http://localhost:5000/api/authority_user/login", { email, password });
    if (res.status !== 200) {
      throw new Error("Unable to login");
    }
=======
=======
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
    const res = await axios.post("/authority_user/login", { email, password });
   // if (res.status !== 200) {
      throw new Error("Unable to login");
    //}
<<<<<<< HEAD
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
=======
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
    const data = await res.data;
    return data;
  };
  
  export const signupauthority = async (
<<<<<<< HEAD
<<<<<<< HEAD
    username: string,
    email: string,
    password: string
  ) => {
    console.log("reached api")
    const res = await axios.post("http://localhost:5000/api/authority_user/signup", { username, email, password });
    if (res.status !== 200) {
     throw new Error("Unable to Signup");
    }
=======
=======
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
    name: string,
    email: string,
    password: string
  ) => {
    const res = await axios.post("/authority_user/signup", { name, email, password });
  //  if (res.status !== 201) {
    // throw new Error("Unable to Signup");
  //  }
<<<<<<< HEAD
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
=======
>>>>>>> 08eaca52fdb70d85899be40054e0e3935c4c8dbb
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