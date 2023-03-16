import CoursesByGrade from "components/CoursesByGrade";
import CoursesByGradeScore from "components/CoursesByGradeScore";
import Grades from "components/Grades";
import GradesByLevel from "components/GradesByLevel";
import HomePage from "components/HomePage";
import LoginPage from "components/LoginPage";
import NewCourse from "components/NewCourse";
import NewGrade from "components/NewGrade";
import NewScore from "components/NewScore";
import NewStudent from "components/NewStudent";
import NewTeacher from "components/NewTeacher";
import ScoresByCourse from "components/ScoresByCourse";
import StudentAttendance from "components/StudentAttendance";
import StudentsByGrade from "components/StudentsByGrade";
import StudentsByGradeAttendance from "components/StudentsByGradeAttendance";
import StudentScore from "components/StudentScore";
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
            path="/studentsByGrade/:gradeId"
            element={isAuth ? <StudentsByGrade /> : <Navigate to="/" />}
          />
          <Route
            path="/newStudent/:gradeId"
            element={isAuth ? <NewStudent /> : <Navigate to="/" />}
          />
          <Route
            path="/coursesByGrade/:gradeId"
            element={isAuth ? <CoursesByGrade /> : <Navigate to="/" />}
          />
          <Route
            path="/newCourse/:gradeId"
            element={isAuth ? <NewCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/coursesByGradeScore/:gradeId"
            element={isAuth ? <CoursesByGradeScore /> : <Navigate to="/" />}
          />
          <Route
            path="/scoresByCourse/:courseId/:gradeId"
            element={isAuth ? <ScoresByCourse /> : <Navigate to="/" />}
          />
          <Route
            path="/newScore/:courseId/:gradeId"
            element={isAuth ? <NewScore /> : <Navigate to="/" />}
          />
          <Route
            path="/studentsByGradeAttendance/:gradeId"
            element={isAuth ? <StudentsByGradeAttendance /> : <Navigate to="/" />}
          />
          <Route
            path="/studentAttendance"
            element={isAuth ? <StudentAttendance /> : <Navigate to="/" />}
          />
          <Route
            path="/studentScore"
            element={isAuth ? <StudentScore /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
