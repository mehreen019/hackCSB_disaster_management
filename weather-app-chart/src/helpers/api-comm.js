import axios from "axios"
let Role = "";
export const storeShelterLocations = async ( locationArray ) => {
    console.log("api comm reached")
    const res = await axios.post("http://localhost:5000/api/authority_user/shelters/save", {locationArray});
    if(res.status !== 200)
    {
        throw new Error("Unable to save shelter locations");
    }
    const data = await res.data;
    return data;
};

export const getShelterLocations = async () => {
    const res = await axios.get("http://localhost:5000/api/authority_user/shelters/get");
     //const res = "hi";
     if (res.status === 200) {
        const data = await res.data;
        console.log(data)
        //return "hiii , how can";
        return data;
     }
     else if(res.status === 401){
        console.log("no schema found")
        return ([]);
     }
     else{
        throw new Error("Unable to send chat");
     }
     
};

// export const loginadmin = async (email , password) => {
//    console.log('hereeeeeeeee')
//    const res = await axios.post("http://localhost:5000/api/admin_user/login", { email, password });
   
//    console.log('Response received:');

//    if (res.status !== 200) {
//      throw new Error("Unable to login");
//    }
//    const data = await res.data;
//    console.log('inside login')
//    console.log(data);
//    Role = "admin";
//    return data;
//  };



 export const loginadmin = async (email, password) => {
  Role = 'admin';
  try {
    console.log('Attempting to log in with email:', email);

    const res = await axios.post("http://localhost:5000/api/admin_user/login", { email, password });

    console.log('Response received---:', res);
    return res.data;

    // // Check if the response status is not 200
    // if (res.status !== 200) {
    //   throw new Error(`Unable to login: Received status code ${res}`);
    // }
    

    // const data = res.data;
    // console.log('Response daaaata:', data);

    // // if (!data) {
    // //   throw new Error("Unable to login: No data received");
    // // }

    // console.log('Inside login');
    // console.log(data);
    // Role = "admin";
    // return data;
  } catch (error) {
    console.log('An error occurred during the login process');
    console.log('recieved -- error : ', error)
    return error.response.status;
    // if (error.response) {
    //   // Server responded with a status other than 200 range
    //   console.error('Error response:', error.response);
    //   if (error.response.status === 403) {
    //     console.error('Login failed: Incorrect credentials or lack of permissions');
    //   }
    //   throw new Error(`Login failed: ${error.response.status} ${error.response.data}`);
    // } else if (error.request) {
    //   // Request was made but no response received
    //   console.error('Error request:', error.request);
    //   throw new Error('Login failed: No response received from server');
    // } else {
    //   // Something else happened
    //   console.error('Error message:', error.message);
    //   throw new Error(`Login failed: ${error.message}`);
    // }
    
  }
};

 export const signupadmin = async (
   username,
   email,
   password
 ) => {
     console.log(username);
   const res = await axios.post("http://localhost:5000/api/admin_user/signup", { username, email, password });
   console.log(res)

   if (res.status !== 200) {
     throw new Error("Unable to Signup ");
   }
   const data = await res.data;
   console.log(data.email);
   Role = "admin";
   return data;
 };

 export const loginauthority = async (email, password) => {
     const res = await axios.post("http://localhost:5000/api/authority_user/login", { email, password });
     console.log(res)
     if (res.status !== 200) {
       throw new Error("Unable to login");
     }
     const data = await res.data;
     Role = "authority";
     return data;
   };
   
   export const signupauthority = async (
     name,
     email,
     password
   ) => {
     console.log("reached api")
     const res = await axios.post("http://localhost:5000/api/authority_user/signup", { name, email, password });
     if (res.status !== 200) {
      throw new Error("Unable to Signup");
     }
     const data = await res.data;
     Role = "authority";
     
     return data;
   };



   export const logoutUser = async () => {
  
    if(Role==="admin"){  
      console.log(Role);
     const res = await axios.get("http://localhost:5000/api/admin_user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    Role = "";
   //toast.success("Logged out Successfully", { id: "login" });
    return data;}
    else if(Role==="authority")
    {
      const res = await axios.get("http://localhost:5000/api/authority_user/logout");
    if (res.status !== 200) {
      throw new Error("Unable to delete chats");
    }
  
    const data = await res.data;
    Role = "";
    //toast.success("Logged out Successfully", { id: "login" });
    return data;
    }
  };

  export const getUserByUsername = async (username) => {
    Role = 'admin';
    try {
      console.log('Searching user with  username:', username);
  
      const res = await axios.post("http://localhost:5000/api/admin_user/username", { username });
  
      console.log('Response received---:', res.data);
      return res.data;
  
    } catch (error) {
      console.log('An error occurred during the search process');
      console.log('recieved -- error : ', error)
      return error.response.status;
      
    }
  };
  export const addFriend = async (username,friendUsername) => {
    Role = 'admin';
    try {
      console.log('Searching user with  username:', friendUsername);
  
      const res = await axios.post("http://localhost:5000/api/admin_user/addfriend", { username , friendUsername});
  
      console.log('Response received---:', res.data);
      return res.data;
  
    } catch (error) {
      console.log('An error occurred during the search process');
      console.log('recieved -- error : ', error)
      return error.response.status;
      
    }
  };