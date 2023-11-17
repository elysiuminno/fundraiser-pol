```javascript
// CRMSystem/src/components/VoterManagement.js

import React, { useState, useEffect } from 'react';
import { getUsersWithPermissions, addVoter, removeVoter, updateVoter } from '../api/voterApi';

const VoterManagement = () => {
  const [voters, setVoters] = useState([]);
  const [newVoter, setNewVoter] = useState({
    name: '',
    address: '',
    contactInfo: '',
    votingHistory: '',
    campaignSegments: [],
  });

  useEffect(() => {
    getUsersWithPermissions('voterManagement')
      .then((response) => {
        setVoters(response.data);
      })
      .catch((error) => {
        console.error('Error retrieving voters:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewVoter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddVoter = () => {
    addVoter(newVoter)
      .then((response) => {
        setVoters((prevState) => [...prevState, response.data]);
        setNewVoter({
          name: '',
          address: '',
          contactInfo: '',
          votingHistory: '',
          campaignSegments: [],
        });
      })
      .catch((error) => {
        console.error('Error adding voter:', error);
      });
  };

  const handleRemoveVoter = (voterId) => {
    removeVoter(voterId)
      .then(() => {
        setVoters((prevState) => prevState.filter((voter) => voter.id !== voterId));
      })
      .catch((error) => {
        console.error('Error removing voter:', error);
      });
  };

  const handleUpdateVoter = (voterId, updatedVoter) => {
    updateVoter(voterId, updatedVoter)
      .then((response) => {
        setVoters((prevState) =>
          prevState.map((voter) => (voter.id === voterId ? response.data : voter))
        );
      })
      .catch((error) => {
        console.error('Error updating voter:', error);
      });
  };

  return (
    <div>
      <h2>Voter Management</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newVoter.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            value={newVoter.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contact Info:
          <input
            type="text"
            name="contactInfo"
            value={newVoter.contactInfo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Voting History:
          <input
            type="text"
            name="votingHistory"
            value={newVoter.votingHistory}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleAddVoter}>
          Add Voter
        </button>
      </form>
      <ul>
        {voters.map((voter) => (
          <li key={voter.id}>
            <div>Name: {voter.name}</div>
            <div>Address: {voter.address}</div>
            <div>Contact Info: {voter.contactInfo}</div>
            <div>Voting History: {voter.votingHistory}</div>
            <button type="button" onClick={() => handleRemoveVoter(voter.id)}>
              Remove Voter
            </button>
            <button
              type="button"
              onClick={() => handleUpdateVoter(voter.id, { ...voter, name: 'Updated Name' })}
            >
              Update Voter
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VoterManagement;
```
