import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

const LoginPage = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const [fileValue, setFileValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeUser, setTypeUser] = useState("Admin");

  const resetForm = () => {
    setFileValue("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const register = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("picture", fileValue);
    formData.append("picturePath", fileValue.name);
    formData.append("email", email);
    formData.append("password", password);
    const savedAdminResponse = await fetch(
      "http://localhost:3003/auth/registerAdmin",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedAdmin = await savedAdminResponse.json();

    if (savedAdmin) {
      setPageType("login");
    }
    resetForm();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) await login();
    if (isRegister) await register();
  };

  return (
    <>
      <div className="title">
        <h1>Welcome to the Blog 1.0</h1>
      </div>
      <form className="form-login" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setFileValue(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="mb-3">
                    <input {...getInputProps()} className="form-control" />
                    {fileValue === "" ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <p>{fileValue.name}</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
          </>
        )}
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
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {isLogin && (
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
        )}
        <div>
          <button type="submit">{isLogin ? "LOGIN" : "REGISTER"}</button>
        </div>
      </form>
      <div className="change-login" role="button">
        <p
          onClick={() => {
            setPageType(isLogin ? "register" : "login");
            setFileValue("");
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
