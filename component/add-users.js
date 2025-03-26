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
    feedbackOptions: [],
  });

  const productOptions = [
    "Energy Saving BLDC Smart Fans",
    "Turnkey Interiors",
    "Keshar Shrikhand",
    "CKP Sode (Dried Prawns)",
    "CKP Tel Poli - Puranpoli",
  ];

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      feedbackOptions: checked
        ? [...prevState.feedbackOptions, value]
        : prevState.feedbackOptions.filter((option) => option !== value),
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    if (!newUser.firstName || !newUser.lastName || !newUser.phoneNumber || !newUser.email || newUser.feedbackOptions.length === 0) {
      alert("Please fill in all required fields and select at least one product.");
      return;
    }

    try {
      await addDoc(collection(db, "useregistration"), newUser);
      setNewUser({ firstName: "", lastName: "", phoneNumber: "", email: "", feedbackOptions: [] });
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
              <input type="text" name="phoneNumber" placeholder="Phone Number" value={newUser.phoneNumber} onChange={handleInputChange} required />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>First Name:<sup>*</sup></h4>
              <input type="text" name="firstName" placeholder="First Name" value={newUser.firstName} onChange={handleInputChange} required />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Last Name:<sup>*</sup></h4>
              <input type="text" name="lastName" placeholder="Last Name" value={newUser.lastName} onChange={handleInputChange} required />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Email:<sup>*</sup></h4>
              <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} required />
            </div>
          </li>
          <li className="form-row">
            <div className="multipleitem">
              <h4>Products:<sup>*</sup></h4>
              {productOptions.map((option, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="feedbackOptions"
                    value={option}
                    checked={newUser.feedbackOptions.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
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
