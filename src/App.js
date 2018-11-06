import React, { Component } from 'react';
import './App.css';

//components
import HomeScreen from "./components/HomeScreen/HomeScreen.js";
import Footer from "./components/Footer/Footer.js";
class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeScreen />
        <Footer />
      </div>
    );
  }
}

export default App;
