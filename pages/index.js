import { useState } from "react";
import { db } from "../firebaseConfig"; // Ensure correct path
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import "../src/app/styles/main.scss";
import "../pages/feedback.css";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    feedbackOptions: [],
  });

  const options = [
    "Energy Saving BLDC Smart Fans",
    "Turnkey Interiors",
    "Keshar Shrikhand",
    "CKP Sode (Dried Prawns)",
    "CKP Tel Poli - Puranpoli"
  ];
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      feedbackOptions: checked
        ? [...prevData.feedbackOptions, value]
        : prevData.feedbackOptions.filter((option) => option !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.phoneNumber || !formData.email || formData.feedbackOptions.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all the fields.",
      });
      return;
    }

    try {
      // Add feedback to the useregistration collection as a new document
      await addDoc(collection(db, "useregistration"), formData);

      Swal.fire({
        icon: "success",
        title: "Data Submitted!",
        text: "We thank you for connecting with us. We shall revert at the earliest",
      });
      setFormData({ firstName: "", lastName: "", phoneNumber: "", email: "", feedbackOptions: [] });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <section className="feedbackContainer">
      <div className="feedback_logo">
        <img src="/images/srenlogo.jpg" alt="Logo" className="sirenlogo"/>
        <img src="/ujustlogo.png" alt="Logo" />
      </div>
      <div className="feedback-form-container">
        <h2 className="feedback-form-title">Data Capturing Tool</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Mobile Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Product List</label>
            <div className="checkbox-group">
              {options.map((option, index) => (
                <div key={index} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    name="feedbackOptions"
                    value={option}
                    checked={formData.feedbackOptions.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>
          <button className="login-button" type="submit">Submit</button>
        </form>
      </div>
      <h2 className="footers">Copyright @2025 | Powered by UJustBe</h2>
    </section>
  );
};

export default FeedbackForm;
