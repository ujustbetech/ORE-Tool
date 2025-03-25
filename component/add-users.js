import { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../src/app/styles/main.scss";

const AddUserPage = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    feedbackOption: "",
  });

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!newUser.firstName || !newUser.lastName || !newUser.phoneNumber || !newUser.email) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "useregistration"), newUser);
      setNewUser({ firstName: "", lastName: "", phoneNumber: "", email: "", feedbackOption: "" });
      alert("User registered successfully!");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <section className="c-form box">
      <h2>Register Users</h2>
      <form onSubmit={handleRegisterUser}>
        <ul>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Mobile Number:<sup>*</sup></h4>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={newUser.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>First Name:<sup>*</sup></h4>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Last Name:<sup>*</sup></h4>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Email:<sup>*</sup></h4>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Product:<sup>*</sup></h4>
              <select
                name="feedbackOption"
                value={newUser.feedbackOption}
                onChange={handleInputChange}
                required
              >
           
  <option value="">Select Product</option>
  <option value="Energy Saving BLDC Smart Fans">Energy Saving BLDC Smart Fans</option>
  <option value="Turnkey Interiors">Turnkey Interiors</option>
  <option value="Keshar Shrikhand">Keshar Shrikhand</option>
  <option value="CKP Sode (Dried Prawns)">CKP Sode (Dried Prawns)</option>
  <option value="CKP Tel Poli - Puranpoli">CKP Tel Poli - Puranpoli</option>
</select>

            
            </div>
          </li>
          <li className="form-row">
            <div>
              <button className="submitbtn" type="submit">Register</button>
            </div>
          </li>
        </ul>
      </form>
    </section>
  );
};

export default AddUserPage;
