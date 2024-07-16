import {ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
    // checkAuthStatus,
    loginadmin,
    signupadmin,
    loginauthority,
    signupauthority,
    logoutUser, 
    getUserByUserNmae,// Uncomment if you have a logout function
} from "../helpers/api-comm";
  
  const AuthContext = createContext({});
  
  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[currentDashboard,setCurrentDashboard]=useState("");
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
      try{
      const data = await loginadmin(email, password);
      console.log("here is the response from api-com : ", data)
     // console.log(data.response.status)
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
      else throw new Error(`${data}`); 
    }catch (error) {
      console.error("Failed to login admin:", error);
    }
    };
  
    const signupAdmin = async (name, email, password) => {
      try{
      const data = await signupadmin(name, email, password);
      if (data) {
        console.log(data.email);
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
    }catch (error) {
      console.error("Failed to signup admin:", error);
    }
    };
  
    const loginAuthority = async (email, password) => {
      try{
      const data = await loginauthority(email, password);
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
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
    const getuser = async(username)=>{
      await getUserByUserNmae(username);
      console.log("User Found");
    }
    const value = {
      user,
      isLoggedIn,
      loginAdmin,
      signupAdmin,
      loginAuthority,
      signupAuthority,
      logout,
      getuser, // Uncomment if you have a logout function
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  