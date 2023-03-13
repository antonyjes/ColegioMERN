import Grades from "components/Grades";
import GradesByLevel from "components/GradesByLevel";
import HomePage from "components/HomePage";
import LoginPage from "components/LoginPage";
import NewGrade from "components/NewGrade";
import NewStudent from "components/NewStudent";
import NewTeacher from "components/NewTeacher";
import StudentsByGrade from "components/StudentsByGrade";
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
          <Route
            path="/newGrade/:level"
            element={isAuth ? <NewGrade /> : <Navigate to="/" />}
          />
          <Route
            path="/gradesByLevel/:level/:action"
            element={isAuth ? <GradesByLevel /> : <Navigate to="/" />}
          />
          <Route
            path="/studentsByGrade/:gradeId/"
            element={isAuth ? <StudentsByGrade /> : <Navigate to="/" />}
          />
          <Route
            path="/newStudent/:gradeId"
            element={isAuth ? <NewStudent /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
