import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    // checkAuthStatus,
    loginadmin,
    signupadmin,
    loginauthority,
    signupauthority,
    // logoutUser, // Uncomment if you have a logout function
  } from "../helper/api-communicator";
  
  // Define user types for Admin and Authority
  type User = {
    username: string;
    email: string;
  };
  
  type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    loginAdmin: (email: string, password: string) => Promise<void>;
    signupAdmin: (username: string, email: string, password: string) => Promise<void>;
    loginAuthority: (email: string, password: string) => Promise<void>;
    signupAuthority: (username: string, email: string, password: string) => Promise<void>;
    // logout: () => Promise<void>; // Uncomment if you have a logout function
  };
  
  const AuthContext = createContext<UserAuth | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
  
    const loginAdmin = async (email: string, password: string) => {
      const data = await loginadmin(email, password);
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
    };
  
    const signupAdmin = async (name: string, email: string, password: string) => {
      const data = await signupadmin(name, email, password);
      if (data) {
        console.log(data.email);
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
    };
  
    const loginAuthority = async (email: string, password: string) => {
      const data = await loginauthority(email, password);
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
    };
  
    const signupAuthority = async (name: string, email: string, password: string) => {
      const data = await signupauthority(name, email, password);
      if (data) {
        setUser({ email: data.email, username: data.name });
        setIsLoggedIn(true);
      }
    };
  
    // Uncomment if you have a logout function
    // const logout = async () => {
    //   await logoutUser();
    //   setIsLoggedIn(false);
    //   setUser(null);
    //   window.location.reload();
    // };
  
    const value = {
      user,
      isLoggedIn,
      loginAdmin,
      signupAdmin,
      loginAuthority,
      signupAuthority,
      // logout, // Uncomment if you have a logout function
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  export const useAuth = () => useContext(AuthContext);
  