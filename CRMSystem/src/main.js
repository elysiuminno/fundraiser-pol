const mainCode = `
import React from 'react';
import ReactDOM from 'react-dom';
import VoterManagement from './components/VoterManagement';
import VoterRequests from './components/VoterRequests';
import Fundraising from './components/Fundraising';
import DonorManagement from './components/DonorManagement';
import FundraisingCampaigns from './components/FundraisingCampaigns';
import DonationTracking from './components/DonationTracking';
import FundraisingReports from './components/FundraisingReports';
import DonorSegmentation from './components/DonorSegmentation';
import FundraisingEvents from './components/FundraisingEvents';

function App() {
  return (
    <div>
      <h1>CRM System</h1>
      <VoterManagement />
      <VoterRequests />
      <Fundraising />
      <DonorManagement />
      <FundraisingCampaigns />
      <DonationTracking />
      <FundraisingReports />
      <DonorSegmentation />
      <FundraisingEvents />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
`;

return mainCode;