import {ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
    // checkAuthStatus,
    loginadmin,
    signupadmin,
    loginauthority,
    signupauthority,
    logoutUser, 
    getUserByUsername,
    addFriend,// Uncomment if you have a logout function
} from "../helpers/api-comm";
  
  const AuthContext = createContext({});
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[current,setCurrent]=useState(null);
    const [role, setRole] = useState('default');
  
    useEffect(() => {
      // Uncomment and implement if you have a checkAuthStatus function
      // async function checkStatus() {
      //   const data = await checkAuthStatus();
      //   if (data) {
      //     setUser({ email: data.email, name: data.name });
      //     setIsLoggedIn(true);
      //   }
      // }
      // checkStatus();

    }, []);
  
 const loginAdmin = async (email, password) => {
    try {
      const data = await loginadmin(email, password);
      console.log("here is the response from api-com : ", data)
     // console.log(data.response.status)
      if (data) {
        setUser({ email: data.email, username: data.name , friends:data.friends});
        setIsLoggedIn(true);
        setRole(data.role);
        console.log('state role:', data.role);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.error("Failed to login admin:", error);
    }
  };

  
  const signupAdmin = async (name, email, password) => {
    try {
      const data = await signupadmin(name, email, password);
      if (data) {
        console.log('whole data obj: ', data);
        console.log(data.email);
        setUser({ email: data.email, username: data.name, friends:data.friends });
        setIsLoggedIn(true);
        setRole(data.role);
        console.log('admin role', data.role);
      }
    } catch (error) {
      console.error("Failed to signup admin:", error);
    }
  };
  
    const loginAuthority = async (email, password) => {
      try{
      const data = await loginauthority(email, password);
      if (data) {
        
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
        setRole(data.role);
        console.log('role is: ', data.role);

      }
      }catch (error) {
        console.error("Failed to login admin:", error);
      }
    };
  
    const signupAuthority = async (name, email, password) => {
      try{
      const data = await signupauthority(name, email, password);
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
        setRole(data.role);
        console.log('role is: ', data.role);
      }
      }
      catch (error) {
        console.error("Failed to login admin:", error);
      } 
    };
    // Uncomment if you have a logout function
    const logout = async () => {
      console.log(user?.role);
      await logoutUser();
      console.log("Logged out");
      setIsLoggedIn(false);
      setUser(null);
    //  window.location.reload();
    };
    const getuser = async (tempusername) => {
      
        const data = await getUserByUsername(tempusername); // Fixed typo
        console.log("Here is the response from API:", data);
        
        if (data) {
          setCurrent({ email: data.email, username: data.name });
         // return data;
        } else {
          throw new Error("Invalid data received");
        }
      
    };
    const addfriend = async()=>
    {
      const data = await addFriend(user?.username,current?.username);
      console.log("Here is the response from API:", data);
      setUser(prevUser => ({
        ...prevUser,
        friends: [...prevUser.friends, current?.username]
      }));
    };
    
    const value = {
      user,
      current,
      role,
      isLoggedIn,
      loginAdmin,
      signupAdmin,
      loginAuthority,
      signupAuthority,
      logout,
      getuser,
      addfriend, // Uncomment if you have a logout function
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  