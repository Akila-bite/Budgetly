import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

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
      <Footer />
    </div>
  );
};