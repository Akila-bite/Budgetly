import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store} from "./redux/store"; // Import Redux store
import { Provider } from "react-redux";
import { TransactionFilterProvider } from "./context/TransactionFilterContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Goals from "./pages/Goals";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Provider store={store}> {/* Wrap entire app with Redux store */}
       <TransactionFilterProvider>

     <Router>
            <AppContent />
      </Router>

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
          <Route path="/goals" element={<Goals />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

    </div>
  );
};