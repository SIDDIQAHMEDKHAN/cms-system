import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const CreateContact = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = fetch(`http://localhost:8000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        body: JSON.stringify(userDetails),
      },
    });
    const result = await res.json();
    if (!result.error) {
      console.log(result);
    } else {
      console.log(result);
    }
  };

  return (
    <>
      <h3>Create Contact</h3>
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
          value="Add Contact"
          className="btn btn-info my-2"
        />
      </form>
    </>
  );
};

export default CreateContact;
