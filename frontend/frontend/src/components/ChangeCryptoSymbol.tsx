import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { setSelected } from '../redux/slices/CryptoSlice';
import { AppState, AppDispatch } from '../redux/store';
import { stocks } from '../constant/Constant';

const ChangeCryptoSymbol: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const currentSelection = useSelector((state: AppState) => state.cryptoStock.selected);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedStock(event.target.value);
  };

  const handleSave = () => {
    dispatch(setSelected(selectedStock || currentSelection));
    handleClose();
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Typography variant="h6">
          Selected Crypto: {selectedStock || currentSelection}
        </Typography>
        </div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Change Crypto
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle}>
          <Typography variant="h6" component="h2">
            Select Crypto
          </Typography>
          <Select
            value={selectedStock || currentSelection}
            onChange={handleChange}
            fullWidth
          >
            {stocks.map((stock) => (
              <MenuItem key={stock} value={stock}>
                {stock}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: 20 }}>
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

// Inline styles for the modal content
const modalStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'white', 
  border: '2px solid #000',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  padding: 16, 
  zIndex: 1300, // Ensuring the modal appears above other content
};

export default ChangeCryptoSymbol;
