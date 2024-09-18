import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import StarShips from "./pages/StarShips/container";
import InfoFilm from "./pages/StarShips/components/InfoFilm/InfoFilm";
import Characters from "./pages/StarShips/components/Characters/Characters";
import Planets from "./pages/StarShips/components/Planets/Planets";
import FlickrGallery from "./pages/FlickrGallery/container";
import Favorite from "./pages/FlickrGallery/components/Favorite/Favorite";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StarShips />} />
        <Route path="/film/:id" element={<InfoFilm />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/flick" element={<FlickrGallery />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
