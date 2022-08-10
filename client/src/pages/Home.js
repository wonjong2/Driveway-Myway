import React from "react";
import DrivewayList from "../components/DrivewayList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <div className="container bg-light bg-gradient">
      <SearchBar />
      <DrivewayList />
    </div>
  );
};

export default Home;
