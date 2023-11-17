```javascript
// CRMSystem/src/components/VoterRequests.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoterRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/requests');
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const removeRequest = async (requestId) => {
    try {
      await axios.delete(`/api/requests/${requestId}`);
      fetchRequests();
    } catch (error) {
      console.error('Error removing request:', error);
    }
  };

  return (
    <div>
      <h2>Voter Requests</h2>
      <table>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Nature of Request</th>
            <th>Voter Information</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.nature}</td>
              <td>{request.voter}</td>
              <td>
                <button onClick={() => removeRequest(request.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VoterRequests;
```
