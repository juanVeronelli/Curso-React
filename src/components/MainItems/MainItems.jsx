import React, { useState, useEffect } from "react";
//firebase
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
//components
import CardItem from "../CardItem/CardItem";
//static
import "./MainItems.css";

const MainItems = () => {
  const [loader, setLoader] = useState(true); // estado que almacena la carga
  const [featured, setFeatured] = useState([]); // estado que almacena los productos destacados

  useEffect(() => {
    setLoader(true);
    const getFeaturedProducts = async (quatity) => {
      const q = query(collection(db, "PRODUCTS"));
      const querySnapshot = await getDocs(q);
      const products = querySnapshot.docs.map((doc) => doc.data());
      return setFeatured(products.slice(0, quatity));
    };
    getFeaturedProducts(6).finally(() => {
      setLoader(false);
    });
  }, []);

  if (loader) {
    return (
      <>
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
      <div className="container-featured" id="featured">
        <h1> These products are the most outstanding! </h1>
        <div className="cards">
          {featured.map((product) => {
            return (
              <div key={product.id}>
                <CardItem
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  category={product.category}
                  image={product.image}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MainItems;
