import React from "react";
import { Link } from "react-router-dom";
//styles
import "./CardItem.css";

const CardItem = (props) => {
  let { name, price, category, image, id } = props;
  return (
    <>
      <div className="card">
        <div className="card-item">
          <Link className="item-image" to={`/items/detail/${id}`}>
            <img src={image} alt="Mens Clothe image" />
            <div className="actions">
              <div className="details"></div>
            </div>
          </Link>
          <div className="item-info">
            <h3> {name} </h3>
            <h4> {category} </h4>
            <h5> 3 installments without interest with card </h5>
            <span> USD ${price} </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItem;
