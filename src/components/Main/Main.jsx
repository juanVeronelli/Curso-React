import React from "react";

//Components
import NavBar from "../Navbar/Navbar";
import Home from "../Home/Home";
import MainItems from "../MainItems/MainItems";
import Footer from "../Footer/Footer";

// componente que alamcena todos los demas componentes de la pagina principal
const Main = () => {
  return (
    <div className="container">
      <NavBar />
      <Home />
      <MainItems />
      <Footer />
    </div>
  );
};

export default Main;
