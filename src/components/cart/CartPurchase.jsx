import React, { useContext, useEffect, useState } from "react";
//components
import NavBar from "../Navbar/Navbar";
import CartCards from "./helpers/CartCards";
//static
import "./CartPurchase.css";
//dependecies
//material
import Alert from "@mui/material/Alert";
//firebase
import { addDoc, collection } from 'firebase/firestore'
import { productContext } from "../../context/CartContext";
import { db } from "../../firebase/firebaseConfig"

const CartPurchase = () => {
  const [items] = useContext(productContext);
  const [values, setValues] = useState({}); // estado que guarda los valores de los precios 
  const [activeAlert, setActiveAlert] = useState(null); // estado que guarda las alertas
  // estado para guardar los datos de la orden
  const [order, setOrder] = useState({
    user: { name: "", city: "", email: ""},
    products: []
  })

  // logica para guardar los productos y los datos del usuario
  const handleOnChange  = (event) => {
    setOrder({
      ...order,
      user:{
        ...order.user,
        [event.target.name]: event.target.value
      },
      products: items
    })
  }

  // logica para ejecutar la compra del usuario
  const handlePurchase = async (event) => {
    event.preventDefault();

    // Verificar si algún dato del usuario está vacío
    if (order.user.name === "" || order.user.city === "" || order.user.email === "") return setActiveAlert({ severity: "error", text: "Completa todos los datos del usuario" });

    // Verificar si no hay productos en el carrito
    if (order.products.length <= 0) return setActiveAlert({ severity: "error", text: "Agrega productos al carrito antes de realizar la compra" });

    // esta todo ok, añado la orden
    const docRef = await addDoc(collection(db, "orders"), {
      order
    })
    setActiveAlert({severity: "success", text: `Orden ejecutada con exito, puedes seguir el envio con el siguente id: ${docRef.id} `})
  }

  useEffect(() => {
    // extraigo los precios de los items
    const extractPrices = () => {
      const prices = items.map(
        (item) =>
          item.product.price.integerValue || item.product.price.doubleValue
      );
      let discount = Math.floor(Math.random() * 3);
      let total = prices.reduce(
        (acc, curr) => parseInt(acc) + parseInt(curr),
        0
      );

      // convierto todo a 0 si no hay prodcutos en el carrito
      if (items.length <= 0) {
        setActiveAlert({
          severity: "info",
          text: "Debes agregar un producto al carrito",
        });
        return setValues({ discount: 0, delivery: 0, total: 0 });
      }
      setActiveAlert(null); // elimino cualquier alerta

      // agrego los valores *delivery siempre vale 2
      total = total - discount;
      setValues({ discount: discount, delivery: 2, total: total });
    };

    extractPrices();
  }, [items]);

  return (
    <>
      <NavBar />
      {activeAlert && (
        <Alert severity={activeAlert.severity}> {activeAlert.text} </Alert>
      )}
      <div className="cart-container">
        <div className="cart-items">
          <h3> Resumen de compra ({items.length} prodcutos)</h3>
          <div className="cart-cards">
            {items.map((item) => {
              return (
                <>
                  <CartCards item={item} />
                </>
              );
            })}
          </div>
        </div>
        <div className="cart-box">
          <div className="cart-resume">
            <h3> Resumen de compra </h3>
            <table>
              <tbody>
                <tr>
                  <td>Descuento</td>
                  <td>${values.discount}</td>
                </tr>
                <tr>
                  <td>envio</td>
                  <td>${values.delivery}</td>
                </tr>
                <tr>
                  <td>total</td>
                  <td>${Math.floor(parseInt(values.total) + parseInt(values.delivery))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="cart-form">
            <h3> Formulario de compra </h3>
            <form>
              <input type="text" onChange={handleOnChange}  placeholder="Nombre" autoComplete="none" name="name" />
              <input type="text" onChange={handleOnChange} placeholder="Email" autoComplete="none" name="email"/>
              <input type="text" onChange={handleOnChange} placeholder="City" autoComplete="none" name="city"/>

              <button type="submit" onClick={handlePurchase}>
                  <span className="detail-box">Purchase</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPurchase;
