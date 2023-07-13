import React from "react";

//dependecies
//material UI
import CloseIcon from '@mui/icons-material/Close';

const CartCards = ({ item }) => {
    return(<>
        <div className="card-container">
            <div className="card-image">
                <img src={item.product.image.stringValue} alt="imagen del producto en el carrito" />
            </div>
            <div className="card-info">
                <h4>{item.product.name.stringValue}</h4>
                <p>Talle: {item.activeItem}</p>
                <h5> ${item.product.price.integerValue || item.product.price.doubleValue} </h5>
            </div>
            <CloseIcon className="close-icon"/>
        </div>
    </>)
}

export default CartCards;