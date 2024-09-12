import { AppDispatch } from '../components/redux/store';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getCategories } from '../components/redux/categorySlice';
import { getProducts } from '../components/redux/productSlice';

type fetchAction = typeof getCategories | typeof getProducts

const loadData = async (
  tries: number,
  setTries: (tries: number | ((prevTries: number) => number)) => void,
  actionToDispatch: fetchAction,
  dispatch: AppDispatch
) => {
  if (tries > 3) {
    toast.error('Failed to load data');
    return;
  }

  try {
    const action = await dispatch<any>(actionToDispatch());
    unwrapResult(action);

    if (actionToDispatch.fulfilled.match(action)) {
      console.log('categories status: success');
      setTries(0);
    } else if (actionToDispatch.rejected.match(action)) {
      console.log('categories status: failed');
      setTries((prevTries: number) => {
        if (prevTries < 3) {
          loadData(prevTries + 1, setTries, actionToDispatch, dispatch);
          return prevTries + 1;
        } else {
          console.log('failed to load after 3 attempts');
          return prevTries;
        }
      });
    }
  } catch (error) {
    console.error('Error loading data:', error);
    toast.error('An error occurred while loading data');
  }
};

export default loadData;