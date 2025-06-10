import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <Provider store={store}> {/* Wrap entire app with Redux store */}

     <Router>
            <AppContent />
      </Router>

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