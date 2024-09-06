import {useNavigate} from 'react-router-dom';
import {OrderOptionTypes} from '../../../types/ui.types';

function OrderOption({
    label, path
}: Readonly<OrderOptionTypes>) {
    const navigate = useNavigate();
    const handleClick = () => {
        if(path){
            navigate(path);
        }
    }
    
    return <li onClick={handleClick}>{label}</li>
}

export default OrderOption;