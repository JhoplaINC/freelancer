import { Navbar } from "./components/Navbar";
import { FreelanceContextProvider } from "./context/FreelanceContext";
import { AppRoutes } from "./Router/AppRoutes";
import './assets/css/main.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';  
import Popper from 'popper.js';  
import 'bootstrap/dist/js/bootstrap.bundle.min';  

const App = () => {
    return (
        <FreelanceContextProvider>
            <Navbar />
            <AppRoutes />
        </FreelanceContextProvider>
    )
}

export default App;