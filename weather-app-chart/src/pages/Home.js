import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/footer";
import LocationSearch from '../components/LocationSearch';
import SimpleMap from '../components/BasicMap';
import MapWithClickableCustomMarkers from '../components/MarkerMap';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



const Home = () => {
      const navigate = useNavigate();
      const auth = useAuth();
      useEffect(() => {
        if (auth?.user) {
          navigate("/home");
        }
        else navigate("/");
      }, [auth, navigate]);

  const theme = useTheme();
  //const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div className="App">
            <header>
                <h1>Weather Visualization</h1>
            </header>
            <body>
                <LocationSearch />
                <MapWithClickableCustomMarkers></MapWithClickableCustomMarkers>
            </body>
            <Footer></Footer>
    </div>
  );
};

export default Home;