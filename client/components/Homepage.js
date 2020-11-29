import React, { useEffect } from "react";
import Search from "./Search";
import Layout from "./Layout";

const Homepage = () => {
  // useEffect(() => {
  //   localStorage.removeItem('searchData');
  // }, []);

  return (
    <Layout>
      <Search />
    </Layout>
  );
};

export default Homepage;
