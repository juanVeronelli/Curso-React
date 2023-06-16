import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//Pages
import Main from "./components/Main/Main";
import ItemListContainer from "./components/Items/ItemsListContainer";
import CardDetail from "./components/CardDetail/CardDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route
          path="/CategoryType/:category"
          exact
          element={<ItemListContainer />}
        />
        <Route path="/items/detail/:id" exact element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
