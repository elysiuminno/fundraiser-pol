```javascript
import React, { useState, useEffect } from 'react';
import { getDonationHistory, recordDonation, sendDonationAcknowledgment } from '../api/donationApi';

const DonationTracking = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationSource, setDonationSource] = useState('');
  const [contributionPreferences, setContributionPreferences] = useState('');

  useEffect(() => {
    fetchDonationHistory();
  }, []);

  const fetchDonationHistory = async () => {
    try {
      const history = await getDonationHistory();
      setDonationHistory(history);
    } catch (error) {
      console.error('Error fetching donation history:', error);
    }
  };

  const handleDonationSubmission = async () => {
    try {
      const donation = {
        amount: donationAmount,
        source: donationSource,
        preferences: contributionPreferences,
      };
      await recordDonation(donation);
      await sendDonationAcknowledgment();
      setDonationAmount('');
      setDonationSource('');
      setContributionPreferences('');
      fetchDonationHistory();
    } catch (error) {
      console.error('Error recording donation:', error);
    }
  };

  return (
    <div>
      <h2>Donation Tracking</h2>
      <div>
        <h3>Record Donation</h3>
        <label>
          Amount:
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
          />
        </label>
        <label>
          Source:
          <input
            type="text"
            value={donationSource}
            onChange={(e) => setDonationSource(e.target.value)}
          />
        </label>
        <label>
          Contribution Preferences:
          <input
            type="text"
            value={contributionPreferences}
            onChange={(e) => setContributionPreferences(e.target.value)}
          />
        </label>
        <button onClick={handleDonationSubmission}>Submit Donation</button>
      </div>
      <div>
        <h3>Donation History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Source</th>
              <th>Campaign</th>
            </tr>
          </thead>
          <tbody>
            {donationHistory.map((donation) => (
              <tr key={donation.id}>
                <td>{donation.date}</td>
                <td>{donation.amount}</td>
                <td>{donation.source}</td>
                <td>{donation.campaign}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationTracking;
```
