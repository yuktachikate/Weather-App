import "./App.css";
import Container from "./components/Container";
import { WeatherProvider } from "./context/WeatherContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherDay from "./components/WeatherDay";

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<Container />}></Route>
            <Route path="/:day" element={<WeatherDay />}></Route>
          </Routes>
        </Router>
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;
