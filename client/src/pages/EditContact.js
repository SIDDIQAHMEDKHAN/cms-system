import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import Spinner from "../components/Spinner";

const EditContact = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Updated [${userDetails.name}] contact`);

      setUserDetails({ name: "", address: "", email: "", phone: "" });
      navigate("/mycontact");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    myUpdatedContact();
  }, []);

  const myUpdatedContact = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await res.json();
      setUserDetails({
        name: result.name,
        email: result.email,
        address: result.address,
        phone: result.phone,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner splash="Loading..." />
      ) : (
        <>
          <h3>Edit Contact</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label httpFor="nameInput" className="form-label mt-4">
                Name of the person
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                aria-describedby="emailHelp"
                name="name"
                value={userDetails.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="form-group">
              <label httpFor="addressInput" className="form-label mt-4">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                aria-describedby="emailHelp"
                name="address"
                value={userDetails.address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="form-group">
              <label httpFor="emailInput" className="form-label mt-4">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group">
              <label httpFor="phoneInput" className="form-label mt-4">
                Contact Number
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                aria-describedby="emailHelp"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="Enter contact number"
                required
              />
            </div>
            <input
              type="submit"
              value="Save changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
