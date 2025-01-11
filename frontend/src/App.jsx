import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
    return (
      <div>
        <div>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
}

export default App
