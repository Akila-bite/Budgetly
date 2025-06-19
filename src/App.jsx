import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store} from "./redux/store"; // Import Redux store
import { Provider } from "react-redux";
import { TransactionFilterProvider } from "./context/TransactionFilterContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Goals from "./pages/Goals";
import Budget from "./pages/Budget";
import TransactionList from "./pages/TransactionList";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {
  return (
    <Provider store={store}> {/* Wrap entire app with Redux store */}
       <TransactionFilterProvider>
       <ThemeProvider>
        <ToastContainer />
     <Router>
            <AppContent />
      </Router>
      </ThemeProvider>

      </TransactionFilterProvider>

        </Provider>
  );
}

function AppContent() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget/>} />
          <Route path="/transactionlist" element={<TransactionList />} />
          <Route path="/goals" element={<Goals />} />
         <Route path="/analytics" element={<Analytics />} />
         <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

    </div>
  );
};