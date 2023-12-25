import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <h3>LOGIN</h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="emailInput" class="form-label mt-4">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordInput" class="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            class="form-control"
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
