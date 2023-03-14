import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  teachers: [],
  students: [],
  grades: [],
  courses: [],
  scores: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setTeachers: (state, action) => {
      state.teachers = action.payload.teachers;
    },
    setStudents: (state, action) => {
      state.students = action.payload.students;
    },
    setGrades: (state, action) => {
      state.grades = action.payload.grades;
    },
    setCourses: (state, action) => {
      state.courses = action.payload.courses;
    },
    setScores: (state, action) => {
      state.scores = action.payload.scores;
    }
  },
});

export const { setLogin, setLogout, setTeachers, setStudents, setGrades, setCourses, setScores } =
  authSlice.actions;
export default authSlice.reducer;