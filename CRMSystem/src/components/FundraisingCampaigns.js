```javascript
import React, { useState, useEffect } from 'react';
import { getFundraisingCampaigns, createFundraisingCampaign, updateFundraisingCampaign, deleteFundraisingCampaign } from '../api/fundraisingCampaigns';
import { getDonors } from '../api/donorManagement';
import { sendCampaignCommunication } from '../api/communicationHub';

function FundraisingCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [donors, setDonors] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    goals: '',
    startDate: '',
    endDate: '',
    organizers: [],
    volunteers: []
  });

  useEffect(() => {
    fetchCampaigns();
    fetchDonors();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const campaignsData = await getFundraisingCampaigns();
      setCampaigns(campaignsData);
    } catch (error) {
      console.error('Error fetching fundraising campaigns:', error);
    }
  };

  const fetchDonors = async () => {
    try {
      const donorsData = await getDonors();
      setDonors(donorsData);
    } catch (error) {
      console.error('Error fetching donors:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCampaign((prevCampaign) => ({
      ...prevCampaign,
      [name]: value
    }));
  };

  const handleOrganizerChange = (event) => {
    const { value } = event.target;
    setNewCampaign((prevCampaign) => ({
      ...prevCampaign,
      organizers: value.split(',')
    }));
  };

  const handleVolunteerChange = (event) => {
    const { value } = event.target;
    setNewCampaign((prevCampaign) => ({
      ...prevCampaign,
      volunteers: value.split(',')
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
        endDate: '',
        organizers: [],
        volunteers: []
      });
      fetchCampaigns();
    } catch (error) {
      console.error('Error creating fundraising campaign:', error);
    }
  };

  const handleUpdateCampaign = async (campaignId, updatedCampaign) => {
    try {
      await updateFundraisingCampaign(campaignId, updatedCampaign);
      fetchCampaigns();
    } catch (error) {
      console.error('Error updating fundraising campaign:', error);
    }
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await deleteFundraisingCampaign(campaignId);
      fetchCampaigns();
    } catch (error) {
      console.error('Error deleting fundraising campaign:', error);
    }
  };

  const handleSendCommunication = async (campaignId, message) => {
    try {
      await sendCampaignCommunication(campaignId, message);
    } catch (error) {
      console.error('Error sending campaign communication:', error);
    }
  };

  return (
    <div>
      <h2>Fundraising Campaigns</h2>
      <div>
        <h3>Create New Campaign</h3>
        <form>
          <label>
            Name:
            <input type="text" name="name" value={newCampaign.name} onChange={handleInputChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={newCampaign.description} onChange={handleInputChange} />
          </label>
          <label>
            Goals:
            <input type="text" name="goals" value={newCampaign.goals} onChange={handleInputChange} />
          </label>
          <label>
            Start Date:
            <input type="date" name="startDate" value={newCampaign.startDate} onChange={handleInputChange} />
          </label>
          <label>
            End Date:
            <input type="date" name="endDate" value={newCampaign.endDate} onChange={handleInputChange} />
          </label>
          <label>
            Organizers (comma-separated):
            <input type="text" name="organizers" value={newCampaign.organizers.join(',')} onChange={handleOrganizerChange} />
          </label>
          <label>
            Volunteers (comma-separated):
            <input type="text" name="volunteers" value={newCampaign.volunteers.join(',')} onChange={handleVolunteerChange} />
          </label>
          <button type="button" onClick={handleCreateCampaign}>Create Campaign</button>
        </form>
      </div>
      <div>
        <h3>Existing Campaigns</h3>
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <h4>{campaign.name}</h4>
            <p>Description: {campaign.description}</p>
            <p>Goals: {campaign.goals}</p>
            <p>Start Date: {campaign.startDate}</p>
            <p>End Date: {campaign.endDate}</p>
            <p>Organizers: {campaign.organizers.join(', ')}</p>
            <p>Volunteers: {campaign.volunteers.join(', ')}</p>
            <button type="button" onClick={() => handleUpdateCampaign(campaign.id, { goals: 'New goals' })}>Update Campaign</button>
            <button type="button" onClick={() => handleDeleteCampaign(campaign.id)}>Delete Campaign</button>
            <button type="button" onClick={() => handleSendCommunication(campaign.id, 'Thank you for your support!')}>Send Communication</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FundraisingCampaigns;
```