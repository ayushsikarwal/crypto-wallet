import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import dayjs from 'dayjs';
function HistoricalData() {
  const [startDate, setStartDate] = useState(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        // Replace with your API call or data fetching logic
        // Example: const response = await fetch(`/api/historical-data?start=${startDate}&end=${endDate}`);
        // Example data format
        const response = [
          { date: '2024-07-01', balance: 100 },
          { date: '2024-07-02', balance: 105 },
          // Add more data points
        ];
        
        // Format the data to fit the chart requirements
        const formattedData = response.map(item => ({
          date: dayjs(item.date).format('YYYY-MM-DD'),
          balance: item.balance
        }));
        
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [startDate, endDate]);

  return (
    <div>
      <h2>Historical Data</h2>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoricalData;
