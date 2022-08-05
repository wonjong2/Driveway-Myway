import React from "react";
import DrivewayList from "../components/DrivewayList";
// import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="container">
      <SearchBar />
      <DrivewayList />
      
    </div>
  );
};

export default Home;
