import {useNavigate} from 'react-router-dom';

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