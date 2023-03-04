import HomePage from "components/HomePage";
import LoginPage from "components/LoginPage";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route 
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
