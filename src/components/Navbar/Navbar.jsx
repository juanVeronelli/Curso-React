import React from "react";
import { Link } from "react-router-dom";
//Icons
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

//styles
import "./Navbar.css";

const NavBar = () => {
  return (
    <>
      <header className="navBar__header">
        <h2 className="logo">
          <Link to={"/"}>Llive.</Link>
        </h2>
        <ul>
          <li>
            <Link to={"/CategoryType/men"}>Men</Link>
          </li>
          <li>
            <Link to={"/CategoryType/women"}>Women</Link>
          </li>
          <li>
            <Link to={"/CategoryType/jewlery"}>Jeweler's</Link>
          </li>
        </ul>
        <button>
          <span className="box">
            Cart
            <ShoppingCartCheckoutIcon
              style={{
                position: "relative",
                top: "6px",
                left: "6px",
                fontSize: "20px",
              }}
            />
          </span>
        </button>
      </header>
    </>
  );
};

export default NavBar;
