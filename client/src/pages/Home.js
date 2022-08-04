import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
