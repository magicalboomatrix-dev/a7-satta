import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './assets/components/Header';
import Home from './home';
import Chart from './pages/Chart';
import Contact from './pages/contact';
import Disclaimer from './pages/disclaimer';
import Privacypolicy from './pages/privacy-policy';
import Termsconditions from './pages/terms-and-conditions';
import GamePage  from './pages/GamePage ';

import Footer from './assets/components/Footer';


function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Redirect "/" to "/home" */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/charts" element={<Chart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms-and-conditions" element={<Termsconditions />} />
        <Route path="/:gameName" element={<GamePage  />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
