import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../src/app/styles/main.scss";
import ExportButton from "./ExportFeedback";

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "useregistration");
      const usersSnapshot = await getDocs(usersRef);
      const userData = usersSnapshot.docs.map((userDoc) => ({
        id: userDoc.id, 
        ...userDoc.data(), 
      }));

      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <section className="c-form box">
      <h2>Registered Users</h2>
      <ExportButton users={users} />
      <table className="table-class">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.email}</td>
              <td>{user.feedbackOptions?.join(", ") || "No Products Selected"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default UserListPage;
