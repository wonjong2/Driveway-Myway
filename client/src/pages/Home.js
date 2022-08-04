import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Driveways from "../components/Driveways";

const Home = () => {
  return (
    <div className="container">
      <Driveways />
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
