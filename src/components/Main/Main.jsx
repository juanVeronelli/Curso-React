import React from "react";

//Components
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";
import MainItems from "../MainItems/MainItems";

// componente que alamcena todos los demas componentes de la pagina principal
const Main = () => {
  return (
    <div className="container">
      <NavBar />
      <Home />
      <MainItems />
    </div>
  );
};

export default Main;
