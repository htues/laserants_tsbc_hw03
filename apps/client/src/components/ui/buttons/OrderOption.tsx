import { useDispatch } from 'react-redux';
import { sortProductsLowToHigh, sortProductsHighToLow } from '../../redux/productSlice';
import {OrderOptionTypes} from '../../../types/ui.types';

const OrderOption: React.FC<OrderOptionTypes> = ({label, sortType}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        if(sortType === 'lowToHigh'){
            dispatch(sortProductsLowToHigh());
        } else {
            dispatch(sortProductsHighToLow());
        }
    }
    return <li onClick={handleClick}>{label}</li>
}


export default OrderOption;