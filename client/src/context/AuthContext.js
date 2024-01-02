import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const [error, setError] = useState(null);

  //Login
  const loginUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      if (!result.error) {
        localStorage.setItem("token", result.token);
      } else {
        console.log(result.error);
        // setError(result.error);
        toast.error(result.error);
        // setError(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Register
  const registerUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...userData }),
      });

      const result = await res.json();
      console.log(result);
      if (!result.error) {
        console.log(result);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ loginUser, registerUser }}>
      <ToastContainer autoClose={2000} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
