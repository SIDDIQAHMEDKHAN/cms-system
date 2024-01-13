import { useEffect, useState } from "react";

const AllContact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(async () => {
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
        console.log(result);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div>
        <h1>Your Contacts</h1>
        <hr className="my-4" />
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
            <tr>
              <th scope="row">Active</th>
              <td>Column content</td>
              <td>Column content</td>
              <td>Column content</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllContact;
