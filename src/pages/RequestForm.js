// frontend/src/pages/RequestForm.js
import React, { useState } from "react";
import axios from "axios";

function RequestForm() {
  const [formData, setFormData] = useState({
    wasteType: "",
    quantity: "",
    location: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/requests", formData);
      alert("Request submitted successfully!");
      setFormData({ wasteType: "", quantity: "", location: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Schedule a Pickup</h2>
      <input name="wasteType" placeholder="Type of Waste" value={formData.wasteType} onChange={handleChange} required />
      <input name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
      <input name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RequestForm;
