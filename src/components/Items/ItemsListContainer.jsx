import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

//firebase
import { db } from "../../firebase/firebaseConfig.js";
import { collection, query, getDocs } from "firebase/firestore";

// Styles
import "./ItemsListContainer.css";

// Pages
import NavBar from "../Navbar/Navbar";

//Components
import CardItem from "../CardItem/CardItem";
import ItemsListMain from "./Helpers/ItemsListMain.jsx";

const ItemListContainer = () => {
  let { category } = useParams(); // traigo la categoria del producto 
  const [products, setProducts] = useState([]); // estado que alamcena los productos 
  const [loader, setLoader] = useState(true); // estado que alamcena la carga
  const [filter, setFilter] = useState(null); // estado para guardar los filtros del usuario
  const location = useLocation();

  //logica para llamar los prodcutos
  const getProducts = async () => {
    const q = query(collection(db, "PRODUCTS"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((product) => {
      const { category, gender, image, name, price, id } =
        product._document.data.value.mapValue.fields;
      return {
        category: category,
        gender: gender,
        id: id,
        image: image,
        name: name,
        price: price,
      };
    });
    const filteredData = data.filter(
      (item) => item.gender.stringValue === category
    );
    setProducts(filteredData);
  };

  //logica que llama a los productos filtrados
  const getCategoryProducts = async (filter) => {
    const q = query(collection(db, "PRODUCTS"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((product) => {
      const { category, gender, image, name, price, id } = product._document.data.value.mapValue.fields;
      return { category: category, gender: gender, id: id, image: image, name: name, price: price,}});

    const filteredData = data.filter(
      (item) => item.gender.stringValue === category && item.category.stringValue === filter
    );
    setProducts(filteredData);
  };

  useEffect(() => {
    setLoader(true);
    if (!location.search) {
      getProducts().finally(() => setLoader(false));
    } else {
        const searchParams = new URLSearchParams(location.search);
        const filter = searchParams.get("filter");
        setFilter(filter);
        getCategoryProducts(filter).finally(() => setLoader(false));
    }
  }, [category, location.search]);

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

  if (products.length <= 0) {
    return (
      <>
        <NavBar />
        <div className="items__main">
          <ItemsListMain category={category} products={products} />
          <div className="cards">
            <h1 className="error-message">
              No products were found with the {filter} filter
            </h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <div className="items__main">
        <ItemsListMain category={category} products={products} />
        <div className="cards">
          {products.map((product) => {
            return (
              <div key={product.id.integerValue}>
                <CardItem
                  id={product.id.integerValue}
                  name={product.name.stringValue}
                  price={product.price.doubleValue || product.price.integerValue }
                  category={product.category.stringValue}
                  image={product.image.stringValue}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ItemListContainer;
