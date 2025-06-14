import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { store} from "./redux/store"; // Import Redux store
import { Provider } from "react-redux";
import { TransactionFilterProvider } from "./context/TransactionFilterContext";
import Header from "./components/Header";
import Home from "./pages/Home";

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
        </Routes>
      </main>

    </div>
  );
};