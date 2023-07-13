import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Main from "./components/Main/Main";
import ItemListContainer from "./components/Items/ItemsListContainer";
import CardDetail from "./components/CardDetail/CardDetail";
import CartPurchase from "./components/cart/CartPurchase";
//context
import { ProductProvider } from "./context/CartContext";
const Router = () => {
  return (
    <BrowserRouter>
      <ProductProvider>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route
            path="/CategoryType/:category"
            exact
            element={<ItemListContainer />}
          />
          <Route path="/items/detail/:id" exact element={<CardDetail />} />
          <Route path="/cart" exact element={<CartPurchase />} />
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
};

export default Router;
