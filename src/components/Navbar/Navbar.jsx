import React, { useContext } from "react";
import { Link } from "react-router-dom";
//Icons
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

//styles
import "./Navbar.css";

//context
import { productContext } from "../../context/CartContext";

const NavBar = () => {
  const [product] = useContext(productContext);
  return (
    <>
      <header className="navBar__header">
        <h2 className="logo">
          <Link to={"/"}>Llive.</Link>
        </h2>
        <ul>
          <li>
            <Link to={"/CategoryType/male"}>Men</Link>
          </li>
          <li>
            <Link to={"/CategoryType/female"}>Women</Link>
          </li>
          <li>
            <Link to={"/CategoryType/jewlery"}>Jeweler's</Link>
          </li>
        </ul>
        <Link to={'/cart'}>
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
            {product.length > 0  && <div className="cart-quantity">{product.length}</div>}
        </button>
              </Link>
      </header>
    </>
  );
};

export default NavBar;
