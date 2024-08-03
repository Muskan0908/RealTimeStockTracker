import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { wrapper, AppDispatch, AppState } from '../redux/store';
import { initializeSocket, setData, setSelected } from '../redux/slices/CryptoSlice';
import ChangeStockModal from '../components/ChangeCryptoSymbol';
import StockChart from '../components/CryptoChart';
import MaterialTable from '@/components/MaterialTable';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selected = useSelector((state: AppState) => state.cryptoStock.selected);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3001/api/prices/${selected}`);
      const data = await response.json();
      dispatch(setData(data));
    };

    fetchData();
    dispatch(initializeSocket());
  }, [dispatch, selected]);

  return (
    <div>
      <h1>Real-Time Crypto Data</h1>
      <ChangeStockModal />
      <MaterialTable/>
      <StockChart />
    </div>
  );
};

export default wrapper.withRedux(Home);
