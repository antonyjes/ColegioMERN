import Grades from "components/Grades";
import HomePage from "components/HomePage";
import LoginPage from "components/LoginPage";
import NewTeacher from "components/NewTeacher";
import Teachers from "components/Teachers";
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
          <Route
            path="/teachers"
            element={isAuth ? <Teachers /> : <Navigate to="/" />}
          />
          <Route
            path="/newTeacher"
            element={isAuth ? <NewTeacher /> : <Navigate to="/" />}
          />
          <Route
            path="/grades/:level"
            element={isAuth ? <Grades /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
