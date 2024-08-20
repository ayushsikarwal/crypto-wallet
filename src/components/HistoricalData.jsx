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
        const response = [
          { date: '2024-07-01', balance: 100 },
          { date: '2024-07-02', balance: 105 },
          // Add more data points
        ];
        
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
    <div className="historical-data-container">
      <h2>Historical Data</h2>
      <div className="date-picker-container">
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
      <div className="chart-container">
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
    </div>
  );
}

export default HistoricalData;
