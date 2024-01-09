import React from 'react';
import '../App.css';

const Home = () => {
  const imgUrl = "https://github.com/bckim9489/JungleWeb/assets/47053587/d1256cf5-19ef-4848-a36f-51eb37b3c3f0"
  return (
    <div style={{textAlign: "center", minHeight: "30vh", margin: "10vh"}}>
      <h1>JungleWeb</h1>
      <br/>
      <br/>
      <br/>
      <img src={imgUrl} className='App-logo' alt="logo"/>
    </div>
  );
};

export default Home;