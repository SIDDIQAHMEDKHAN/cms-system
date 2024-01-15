import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { Modal } from "react-bootstrap";
import ToastContext from "../context/ToastContext";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const AllContact = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    myFetchedContacts();
  }, []);

  const myFetchedContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/mycontacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setContacts(result.contacts);
        setLoading(false);
        console.log(result);
      } else {
        setLoading(false);
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Contact Deleted");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );

    console.log(newSearchUser);
    setContacts(newSearchUser);
  };

  return (
    <>
      <div>
        <h1>Your Contacts</h1>
        <a href="/mycontact" className="btn btn-danger my-2">
          Reload Contacts
        </a>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading contacts..." />
        ) : (
          <>
            {contacts.length == 0 ? (
              <h3>No contacts created</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control m-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                </form>
                <p>Total Contacts: {contacts.length}</p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr
                        key={contact._id}
                        onClick={() => {
                          {
                            setModalData({});
                            setModalData(contact);
                            setShowModal(true);
                          }
                        }}
                      >
                        <th scope="row">{contact.name}</th>
                        <td>{contact.address}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>
            <strong>{modalData.name}</strong>
          </h3>
          <p>
            <strong>Address:</strong> {modalData.address}
          </p>
          <p>
            <strong>Email:</strong> {modalData.email}
          </p>
          <p>
            <strong>Phone:</strong> {modalData.phone}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteContact(modalData._id);
            }}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AllContact;
