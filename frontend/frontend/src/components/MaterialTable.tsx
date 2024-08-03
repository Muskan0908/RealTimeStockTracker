import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MaterialTable: React.FC = () => {
  const data = useSelector((state: AppState) => state.cryptoStock.data);
  const selected = useSelector((state: AppState) => state.cryptoStock.selected);

  const filteredData = data.filter((row) => row.symbol === selected).map((item, index) => ({
    id: index,
    timestamp: new Date(item.timestamp).toLocaleString(),
    price: item.price,
    symbol: item.symbol,
    allTimeHighUSD: item.allTimeHighUSD
  }));

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Price (USD)</TableCell>
            <TableCell align="right">All Time High (USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => (
            <TableRow key={row.timestamp}>
              <TableCell component="th" scope="row">
                {new Date(row.timestamp).toLocaleString()}
              </TableCell>
              <TableCell>{row.symbol}</TableCell>
              <TableCell align="right">{row.price.toFixed(2)}</TableCell>
              <TableCell align="right">{row.allTimeHighUSD.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
