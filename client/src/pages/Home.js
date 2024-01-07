import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Welcom {user ? user.name : null}</h1>
        <hr className="my-4" />
        <p className="lead">
          <a className="btn btn-info" href="#" role="button">
            Add Contact
          </a>
        </p>
      </div>
    </>
  );
};

export default Home;
