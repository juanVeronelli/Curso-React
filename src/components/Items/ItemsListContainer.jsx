import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Styles
import "./ItemsListContainer.css";

//icons
import TuneIcon from "@mui/icons-material/Tune";

// Pages
import NavBar from "../Navbar/Navbar";

//Components
import CardItem from "../CardItem/CardItem";

const endpoints = {
  jewlery: () => {
    return "https://fakestoreapi.com/products/category/jewelery";
  },
  men: () => {
    return "https://fakestoreapi.com/products/category/men's clothing";
  },
  women: () => {
    return "https://fakestoreapi.com/products/category/women's clothing";
  },
};

const ItemListContainer = () => {
  let { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);

  if (!endpoints.hasOwnProperty(category)) {
    return console.log("No existe la categoria");
  }

  useEffect(() => {
    setLoader(true);
    axios
      .get(endpoints[category]())
      .then((data) => setProducts(data.data))
      .finally(() => setLoader(false));
  }, [category]);

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
      <div className="items__main">
        <div className="main__title">
          <h3 className="items__title"> {products[0].category} collection </h3>
          <span className="items__count"> {products.length} products </span>
        </div>
        <hr />
        <button className="btn-filter">
          <TuneIcon
            style={{
              position: "relative",
              top: "4px",
            }}
          />
          <span> Filter </span>
        </button>
        <hr />
        <div className="items__list">
          <div className="cards">
            {products.map((item) => {
              return (
                <Link to={`/items/detail/${item.id}`}>
                  <CardItem
                    key={item.id}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                    description={item.description}
                    image={item.image}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemListContainer;
