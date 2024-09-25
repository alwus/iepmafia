// src/App.js
import ReactGA from "react-ga4";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Games from './pages/Games';
import Roster from './pages/Roster';

function App() {
  ReactGA.initialize('G-LJQEJ4CYSP');

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/games" element={<Games />} />
        <Route path="/roster" element={<Roster />} />
      </Routes>
    </Router>
  );
}

export default App;
