import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { io } from 'socket.io-client';

interface CryptoStockState {
  data: any[];
  selected: string;
}

const initialState: CryptoStockState = {
  data: [],
  selected: 'ETH',
};

const cryptoStockSlice = createSlice({
  name: 'cryptoStock',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload.filter(item => item.symbol === state.selected);
    },
    addData: (state, action: PayloadAction<any[]>) => {
      const newData = [...action.payload, ...state.data];
      state.data = newData.slice(0, 20);
    },
    setSelected: (state, action: PayloadAction<string>) => {
      state.selected = action.payload;
      state.data = [];
    },
  },
});

export const { setData, addData, setSelected } = cryptoStockSlice.actions;

export const initializeSocket = (): AppThunk => (dispatch) => {
  const socket = io('http://localhost:3001');

  socket.on('UPDATE_DATA', (newData) => {
    dispatch(addData(newData));
  });

  return () => {
    socket.disconnect();
  };
};

export default cryptoStockSlice.reducer;
