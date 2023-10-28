```javascript
import React, { useState, useEffect } from 'react';
import { getDonors, addDonor, removeDonor, updateDonor } from '../api/donorApi';

const DonorManagement = () => {
  const [donors, setDonors] = useState([]);
  const [newDonor, setNewDonor] = useState({
    name: '',
    contactDetails: '',
    givingHistory: '',
    preferences: '',
  });

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const response = await getDonors();
    setDonors(response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDonor((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddDonor = async () => {
    await addDonor(newDonor);
    setNewDonor({
      name: '',
      contactDetails: '',
      givingHistory: '',
      preferences: '',
    });
    fetchDonors();
  };

  const handleRemoveDonor = async (id) => {
    await removeDonor(id);
    fetchDonors();
  };

  const handleUpdateDonor = async (id, updatedDonor) => {
    await updateDonor(id, updatedDonor);
    fetchDonors();
  };

  return (
    <div>
      <h2>Donor Management</h2>
      <div>
        <h3>Add Donor</h3>
        <input
          type="text"
          name="name"
          value={newDonor.name}
          onChange={handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="contactDetails"
          value={newDonor.contactDetails}
          onChange={handleInputChange}
          placeholder="Contact Details"
        />
        <input
          type="text"
          name="givingHistory"
          value={newDonor.givingHistory}
          onChange={handleInputChange}
          placeholder="Giving History"
        />
        <input
          type="text"
          name="preferences"
          value={newDonor.preferences}
          onChange={handleInputChange}
          placeholder="Preferences"
        />
        <button onClick={handleAddDonor}>Add Donor</button>
      </div>
      <div>
        <h3>Donor List</h3>
        <ul>
          {donors.map((donor) => (
            <li key={donor.id}>
              {donor.name} - {donor.contactDetails} - {donor.givingHistory} - {donor.preferences}
              <button onClick={() => handleRemoveDonor(donor.id)}>Remove</button>
              <button onClick={() => handleUpdateDonor(donor.id, { ...donor, name: 'Updated Name' })}>
                Update
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonorManagement;
```
