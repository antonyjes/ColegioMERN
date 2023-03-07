import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  teachers: [],
  students: [],
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
    }
  },
});

export const { setLogin, setLogout, setTeachers, setStudents } =
  authSlice.actions;
export default authSlice.reducer;