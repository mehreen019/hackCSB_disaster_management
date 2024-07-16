import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./shared/Logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";

const Header = () => {
  const auth = useAuth();
  const [loginAnchorEl, setLoginAnchorEl] = useState(null);
  const [signupAnchorEl, setSignupAnchorEl] = useState(null);

  const handleLoginClick = (event) => {
    setLoginAnchorEl(event.currentTarget);
  };

  const handleLoginClose = () => {
    setLoginAnchorEl(null);
  };

  const handleSignupClick = (event) => {
    setSignupAnchorEl(event.currentTarget);
  };

  const handleSignupClose = () => {
    setSignupAnchorEl(null);
  };

  return (
    <AppBar sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
       
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink bg="#00fffc" to="/" text="Logout" textColor="black" onClick={auth.logout}  />
              <NavigationLink
            bg="#51538f"
            textColor="white"
            to={`/profile/${auth.user.username}`}  // Include the username in the route
            text="Profile"
          />
           <NavigationLink bg="#00fffc" to="/home" text="Home" textColor="black"/>
            </>
          ) : (
            <>
              <Button
                onClick={handleLoginClick}
                sx={{ bgcolor: "#00fffc", color: "black", mr: 2 }}
              >
                Login
              </Button>
              <Menu
                anchorEl={loginAnchorEl}
                open={Boolean(loginAnchorEl)}
                onClose={handleLoginClose}
              >
                <MenuItem onClick={handleLoginClose}>
                  <NavigationLink to="/admin_user/login" text="Admin Login" />
                </MenuItem>
                <MenuItem onClick={handleLoginClose}>
                  <NavigationLink to="/authority_user/login" text="Authority Login" />
                </MenuItem>
              </Menu>
              <Button
                onClick={handleSignupClick}
                sx={{ bgcolor: "#51538f", color: "white" }}
              >
                Signup
              </Button>
              <Menu
                anchorEl={signupAnchorEl}
                open={Boolean(signupAnchorEl)}
                onClose={handleSignupClose}
              >
                <MenuItem onClick={handleSignupClose}>
                  <NavigationLink to="/admin_user/signup" text="Admin Signup" />
                </MenuItem>
                <MenuItem onClick={handleSignupClose}>
                  <NavigationLink to="/authority_user/signup" text="Authority Signup" />
                </MenuItem>
              </Menu>
            </>
          )}
          
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
