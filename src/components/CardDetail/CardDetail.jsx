import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

//pages
import NavBar from "../Navbar/Navbar";

//Styles
import "./CardDetail.css";

//icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const CardDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => setProduct(response.data));
  }, []);

  return (
    <>
      <NavBar />
      <div className="card-detail">
        <div className="detail-img">
          <img src={product.image} alt="" />
        </div>
        <div className="detail-info">
          <span> {product.category} </span>
          <h3> {product.title} </h3>
          <h3> usd ${product.price}</h3>
          <hr />
          <p id="description">{product.description}</p>
          <hr />
          <div className="shipment">
            <LocalShippingIcon
              style={{
                position: "relative",
                top: "-3px",
                fontSize: "42px",
                fill: "green",
              }}
            />
            <p>Free shipping nationwide</p>
          </div>
          <hr />
          <div className="sizes">
            <h4> sizes: </h4>
            <ul>
              <li>S</li>
              <li>M</li>
              <li>L</li>
              <li>XL</li>
            </ul>
          </div>
          <button> Add to cart </button>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
