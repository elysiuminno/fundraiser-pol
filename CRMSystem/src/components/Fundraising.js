```javascript
import React, { useState, useEffect } from 'react';
import { getFundraisingCampaigns, createFundraisingCampaign, updateFundraisingCampaign } from '../api/fundraisingApi';

const Fundraising = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    goals: '',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await getFundraisingCampaigns();
      setCampaigns(response.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value
    }));
  };

  const handleCreateCampaign = async () => {
    try {
      await createFundraisingCampaign(newCampaign);
      setNewCampaign({
        name: '',
        description: '',
        goals: '',
        startDate: '',
        endDate: ''
      });
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const handleUpdateCampaign = async (campaignId, updatedCampaign) => {
    try {
      await updateFundraisingCampaign(campaignId, updatedCampaign);
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  return (
    <div>
      <h2>Fundraising Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign.id}>
            <h3>{campaign.name}</h3>
            <p>{campaign.description}</p>
            <p>Goals: {campaign.goals}</p>
            <p>Start Date: {campaign.startDate}</p>
            <p>End Date: {campaign.endDate}</p>
            <button onClick={() => handleUpdateCampaign(campaign.id, { goals: 'New goals' })}>
              Update Goals
            </button>
          </li>
        ))}
      </ul>
      <h3>Create New Campaign</h3>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newCampaign.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={newCampaign.description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Goals:
          <input
            type="text"
            name="goals"
            value={newCampaign.goals}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={newCampaign.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={newCampaign.endDate}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleCreateCampaign}>
          Create Campaign
        </button>
      </form>
    </div>
  );
};

export default Fundraising;
```
