import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isLoginStudent = pageType === "loginStudent";

  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Admin");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const login = async () => {
    const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ typeUser, email, password }),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
    resetForm();
  };

  const loginStudent = async () => {
    const loggedInResponse = await fetch("http://localhost:3003/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ typeUser: "Student", dni, password }),
    });
    const loggedIn = await loggedInResponse.json();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) await login();
    if (isLoginStudent) await loginStudent();
  };

  return (
    <>
      <div className="text-center p-7">
      <h1 className="text-5xl font-extrabold dark:text-white"><small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Welcome to the School</small></h1>
      </div>
      <form className="p-10" onSubmit={handleSubmit}>
        {isLogin ? (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of User</label>
              <select
                value={typeUser}
                onChange={(e) => setTypeUser(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </>
        ) : (
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">DNI</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="78909889"
              onChange={(e) => setDni(e.target.value)}
              value={dni}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-7">{isLogin ? "LOGIN" : "LOGIN STUDENT"}</button>
        </div>
      </form>
      <div className="change-login" role="button">
        <p
          onClick={() => {
            setPageType(isLogin ? "loginStudent" : "login");
          }}
          className="pl-10 underline"
        >
          {isLogin
            ? "I'm not an admin or teacher."
            : "I'm not a student."}
        </p>
      </div>
    </>
  );
};

export default LoginPage;
