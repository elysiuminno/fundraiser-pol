```javascript
// CRMSystem/src/components/FundraisingReports.js

import React, { useState, useEffect } from 'react';
import { generateFundraisingReport, exportFundraisingData } from '../utils/fundraisingUtils';
import { BarChart, PieChart, Table } from '../components/Charts';
import { Button, Dropdown, ExportButton } from '../components/UI';

const FundraisingReports = () => {
  const [reportData, setReportData] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    // Fetch initial report data
    const fetchData = async () => {
      const data = await generateFundraisingReport();
      setReportData(data);
    };

    fetchData();
  }, []);

  const handleReportSelection = (report) => {
    setSelectedReport(report);
  };

  const handleExport = () => {
    exportFundraisingData(reportData);
  };

  return (
    <div>
      <h2>Fundraising Reports</h2>
      <Dropdown
        options={['Donation Summary', 'Campaign Contributions', 'Donor Segments']}
        onSelect={handleReportSelection}
      />
      {reportData && selectedReport === 'Donation Summary' && (
        <div>
          <h3>Donation Summary</h3>
          <BarChart data={reportData.donationSummary} />
        </div>
      )}
      {reportData && selectedReport === 'Campaign Contributions' && (
        <div>
          <h3>Campaign Contributions</h3>
          <PieChart data={reportData.campaignContributions} />
        </div>
      )}
      {reportData && selectedReport === 'Donor Segments' && (
        <div>
          <h3>Donor Segments</h3>
          <Table data={reportData.donorSegments} />
        </div>
      )}
      <Button onClick={handleExport}>Export Data</Button>
      <ExportButton onClick={handleExport}>Export Data</ExportButton>
    </div>
  );
};

export default FundraisingReports;
```
