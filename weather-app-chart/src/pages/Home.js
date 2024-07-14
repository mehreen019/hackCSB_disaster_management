import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";
import Footer from "../components/footer/footer";
import LocationSearch from '../components/LocationSearch';
import SimpleMap from '../components/BasicMap';
import MapWithClickableCustomMarkers from '../components/MarkerMap';

const Home = () => {
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