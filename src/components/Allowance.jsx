import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { ethers } from 'ethers';

function Allowance() {
  const [allowanceData, setAllowanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllowanceData = async () => {
      setLoading(true);
      try {
        // const tokenAddress = '0xYourTokenAddress'; // Replace with actual token contract address
        // const spenderAddresses = [
        //   '0xSpenderAddress1',
        //   '0xSpenderAddress2',
        //   // Add more spender addresses
        // ];
        const tokenAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI Mainnet Address
        const spenderAddresses = [
          '0x7a250d5630b4cf539739df2c5dacab8c72c8aef9', // Uniswap V2 Router
          '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f', // SushiSwap Router
        ];

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const tokenContract = new ethers.Contract(tokenAddress, [
          'function allowance(address owner, address spender) view returns (uint256)',
        ], signer);

        const ownerAddress = await signer.getAddress();

        const allowances = await Promise.all(
          spenderAddresses.map(async (spender) => {
            const allowance = await tokenContract.allowance(ownerAddress, spender);
            return {
              spender,
              allowance: ethers.formatUnits(allowance, 18),
            };
          })
        );

        setAllowanceData(allowances);
      } catch (error) {
        console.error('Error fetching allowance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllowanceData();
  }, []);

  return (
    <div>
      <h2>Token Allowance</h2>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Spender Address</TableCell>
                <TableCell>Allowance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allowanceData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.spender}</TableCell>
                  <TableCell>{row.allowance} TOKEN</TableCell> {/* Adjust the unit accordingly */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Allowance;
