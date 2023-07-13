import React from "react";
import { Link } from "react-router-dom";

//Styles
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container__home">
        <div className="home__main">
          <h1>
            the best <br /> style, <br /> the best <br /> clothes
          </h1>
          <button>
            <a href="#featured">
              <span className="home-box">check out our featured products</span>
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
