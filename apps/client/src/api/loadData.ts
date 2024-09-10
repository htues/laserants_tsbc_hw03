import { useDispatch } from 'react-redux'
import { getCategories } from '../components/redux/categorySlice'
import { AppDispatch } from '../components/redux/store'
import { toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

// type fetchAction = typeof getCategories | typeof getProducts
type fetchAction = typeof getCategories

const loadData = async (
  tries: number,
  setTries: (tries: number | ((prevTries: number) => number)) => void,
  actionToDispatch: fetchAction,
) => {
  const dispatch = useDispatch<AppDispatch>()

  if (tries > 3) {
    toast.error('Failed to load data')
    return
  }

  try {
    const action = await dispatch<any>(actionToDispatch())
    unwrapResult(action)

    if (actionToDispatch.fulfilled.match(action)) {
      console.log('categories status: success')
      setTries(0)
    } else if (actionToDispatch.rejected.match(action)) {
      console.log('categories status: failed')
      setTries((prevTries: number) => {
        if (prevTries < 3) {
          loadData(prevTries + 1, setTries, actionToDispatch)
          return prevTries + 1
        } else {
          console.log('failed to load after 3 attempts')
          return prevTries
        }
      })
    }
  } catch (error) {
    console.error('Error loading data:', error)
    toast.error('An error occurred while loading data')
  }
}

export default loadData
