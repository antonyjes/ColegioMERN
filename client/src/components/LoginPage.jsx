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
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({typeUser: "Student", dni, password}),
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
      <div className="title">
        <h1>Welcome to the Blog 1.0</h1>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        {isLogin ? (
          <>
          <div className="mb-3">
          <label className="form-label">Type of User</label>
          <select
            value={typeUser}
            onChange={(e) => setTypeUser(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          </>
        ) : (
          <div className="mb-3">
            <label className="form-label">DNI</label>
            <input
              type="dni"
              className="form-control"
              placeholder="name@example.com"
              onChange={(e) => setDni(e.target.value)}
              value={dni}
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <button type="submit">{isLogin ? "LOGIN" : "LOGIN STUDENT"}</button>
        </div>
      </form>
      <div className="change-login" role="button">
        <p
          onClick={() => {
            setPageType(isLogin ? "loginStudent" : "login");
          }}
        >
          {isLogin
            ? "Don't have an account? Sign Up here."
            : "Already have an account? Login here."}
        </p>
      </div>
    </>
  );
};

export default LoginPage;
