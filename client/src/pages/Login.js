import { Link } from "react-router-dom";
import { useContext, useState } from "react";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // toast.success("Logged in");

    if (!credentials.email || !credentials.password) {
      toast.error("Please enter all the required fields");
      return;
    }

    loginUser(credentials);
  };

  return (
    <>
      {/* <ToastContainer autoClose={2000} /> */}

      <h3>LOGIN</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label httpFor="emailInput" className="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div className="form-group">
          <label httpFor="passwordInput" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary my-3" />
        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
