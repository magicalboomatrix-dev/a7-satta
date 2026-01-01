import { Routes, Route, Navigate} from "react-router-dom";
import Header from "./assets/components/Header";
import Home from "./home";
import Chart from "./pages/Chart";
import Contact from "./pages/contact";
import Disclaimer from "./pages/disclaimer";
import Privacypolicy from "./pages/privacy-policy";
import Termsconditions from "./pages/terms-and-conditions";
import GamePage from "./pages/GamePage";
import Rashifamily from "./pages/01-100-ki-family";
import Footer from "./assets/components/Footer";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/charts" element={<Chart />} />
        <Route path="/yearly-chart/satta-king-result" element={<Chart />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms-and-conditions" element={<Termsconditions />} />
        <Route path="/01-100-ki-family" element={<Rashifamily />} />
        <Route path="/:chartYear/:gameSlug" element={<GamePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
