import React from "react";

//styles
import "./CardItem.css";

const CardItem = (props) => {
  let { title, price, category, description, image } = props;

  return (
    <>
      <div className="card-item">
        <div className="item-image">
          <img src={image} alt="Mens Clothe image" />
        </div>
        <div className="item-info">
          <h3> {title} </h3>
          <h4> {category} </h4>
          <h5> 3 installments without interest with card </h5>
          <span> USD ${price} </span>
        </div>
      </div>
    </>
  );
};

export default CardItem;
