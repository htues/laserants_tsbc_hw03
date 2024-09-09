import { useSelector, useDispatch } from 'react-redux'
import ShoppingCart from '../ui/forms/ShoppingCart'
import { ShoppingCartTypes } from '../../types/scart.types'
import {
  selectCartItems,
  selectSubtotal,
  selectTaxes,
  selectTotal,
} from '../redux/scartSelector'
import { increaseItem, decreaseItem } from '../redux/scartSlice'

const ViewCart: React.FC<ShoppingCartTypes> = ({ onClose }) => {
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectSubtotal)
  const taxes = useSelector(selectTaxes)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()

  return (
    <ShoppingCart onClose={onClose}>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-500">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => dispatch(decreaseItem(item.id))}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => dispatch(increaseItem(item.id))}>+</button>
          </div>
        </div>
      ))}

      <div className="mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>${taxes.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </ShoppingCart>
  )
}

export default ViewCart
