import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

//dependecies
//fireabase
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
//material
import Alert from '@mui/material/Alert';
//icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";


//pages
import NavBar from "../Navbar/Navbar";
import ListItem from "./helpers/ListItem";

//Styles
import "./CardDetail.css";

//context
import { productContext } from "../../context/CartContext";



const CardDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({}); // estado para almacenar el producto
  const [loader, setLoader] = useState(true); // estado para almacenar la carga
  const [activeItem, setActiveItem] = useState(null); // estado para guardar el talle requerido
  const [activeAlert, setActiveAlert] = useState(null); // estado para activar el alert
  //llamo al values del context
  const [ products, handleClickCart ] = useContext(productContext);

  const handleClick = () => {
    if(!activeItem) return setActiveAlert({severity: "warning", text: "Elige un talle para continuar la compra"});
    
    setActiveAlert({severity: "success", text: "El pedido fue agregado al carrito con exito"})
    return handleClickCart(product, activeItem)
}

  const handleClickSize = (key, value) => {
    if (value > 0) {
      setActiveAlert(null)
      return setActiveItem(key);
    }
    setActiveItem(null);
    setActiveAlert({severity: "error", text: `No hay mas stock en el talle ${key}`})
  };


  // este useEffect hace la query del producto especifico
  useEffect(() => {
    setLoader(true); // inicializo el loader en true 
    const getProduct = async (id) => {
      // Creo una consulta para obtener un producto específico por su id
      const q = query(collection(db, "PRODUCTS"), where("id", "==", parseInt(id)));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((product) => {
        // Mapeo los documentos obtenidos y extrae los campos relevantes del producto
        const { category, gender, image, name, tallas, price, id } = product._document.data.value.mapValue.fields;
        return { category: category, gender: gender, id: id, size: tallas, image: image, name: name, price: price };
      });
      setProduct(data[0]);
    };

    getProduct(id).finally(() => setLoader(false)); // Finalmente, establece el estado de loader como false para ocultar el indicador de carga
  }, [id]);

  if (loader) {
    return (
      <>
        <NavBar />
        <div className="items__main">
          <div className="main__title">
            <h3 className="items__title"> Loading... </h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="cardDetail-container">
        <div className="cardDetail-grid">
          <div className="detail-image">
            <img
              src={product.image.stringValue}
              alt={
                "Imagen obtenida de la base de datos con el id " +
                product.id.integerValue
              }
            />
          </div>
          <div className="detail-info">
            <span className="info-category">
              {" "}
              {product.gender.stringValue} / {product.category.stringValue}{" "}
            </span>
            <h2> {product.name.stringValue} </h2>
            <span className="info-price">
              {" "}
              ${product.price.doubleValue || product.price.integerValue}{" "}
            </span>
            <p className="info-payment">
              {" "}
              3 Installments without interest with card of{" "}
              {Math.ceil(product.price.doubleValue / 3) ||
                product.price.integerValue / 3}{" "}
              dollars each{" "}
            </p>
            <p className="info-star">
              {" "}
              * Small surcharge to the final price on some products{" "}
            </p>
            <hr />
            <div className="info-delivery">
              <LocalShippingIcon
                className="icon"
                style={{
                  marginRight: "10px",
                  fontSize: "60px",
                  color: "green",
                }}
              />
              Free shipping throughout the country
            </div>
            <hr />
            <h3 className="info-size"> Pick your size </h3>
            <ul className="sizeList">
              {Object.keys(product.size.mapValue.fields).map((item) => {
                return (
                  <>
                    <ListItem
                      handleClick={() => {
                        handleClickSize(item, product.size.mapValue.fields[item].integerValue);
                      }}
                      isActive={activeItem === item}
                      keySize={item}
                    />
                  </>
                );
              })}
            </ul>
            <hr />
            {activeAlert && <Alert severity={activeAlert.severity}>{activeAlert.text}</Alert>}
            <button onClick={handleClick}>
              <span className="detail-box">
                Add Cart
                <ShoppingCartCheckoutIcon
                  style={{
                    position: "relative",
                    top: "1px",
                    left: "10px",
                    fill: "white",
                    fontSize: "30px",
                  }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
