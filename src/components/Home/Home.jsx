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
            The best <br /> place to <br /> buy your <br /> clothes{" "}
          </h1>
          <button>
            <Link to={"/CategoryType/jewlery"}>
              <span className="home-box"> look at our jewelry </span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
