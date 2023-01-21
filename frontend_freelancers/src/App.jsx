import { Navbar } from "./components/Navbar";
import { FreelanceContextProvider } from "./context/FreelanceContext";
import { AppRoutes } from "./Router/AppRoutes";
import './assets/css/main.css';

const App = () => {
    return (
        <FreelanceContextProvider>
            <Navbar />
            <AppRoutes />
        </FreelanceContextProvider>
    )
}

export default App;