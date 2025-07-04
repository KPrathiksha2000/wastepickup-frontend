// frontend/src/pages/AdminPanel.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import './AdminPanel.css';
import { useNavigate } from "react-router-dom";


function AdminPanel() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/requests/${id}`, { status: newStatus });
      fetchRequests();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${id}`);
      fetchRequests();
    } catch (err) {
      console.error("Error deleting request:", err);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <ul>
        {requests.map((req) => (
          <li key={req._id}>
            <strong>{req.quantity}</strong> - Waste of type <strong>{req.wasteType}</strong> to be collected from <strong>{req.location}</strong> 
            <h2> </h2>
            <br />
            Status:{" "}
            <select
              value={req.status}
              onChange={(e) => updateStatus(req._id, e.target.value)}
            >
              <option>Pending</option>
              <option>Scheduled</option>
              <option>Completed</option>
            </select>

            <button onClick={() => deleteRequest(req._id)} className="deleterequest">Delete</button>
            <hr />
          </li>
        ))}
      </ul>
      <div className="adminlogout">
        <button onClick={handleLogout} >Logout</button>
      </div>
    </div>
  );
}

export default AdminPanel;
