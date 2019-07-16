import React from "react";
import Posts from "../post/Posts";
import '../style/bckgStyle.css';


const Home = () => (
  <div className='bckg-home'>
    <div className="jumbotron bckg-home2 bg-white">
     
      <p className="lead"><h2>Welcome</h2></p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
