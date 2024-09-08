import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa'
import { productStyles } from '../twind/styles'
import { ProductCardTypes } from '../../../types/product.types'
import React from 'react'

const ProductCard: React.FC<ProductCardTypes> = ({ product, onDetailsClick }) => {
  const { name, price, imageUrl } = product
  return (
    <div className={productStyles.dboard_card}>
    <img src={imageUrl} alt={name} className={productStyles.dboard_image} />
      <div className={productStyles.dboard_details}>
        <h2 className={productStyles.dboard_name}>{name}</h2>
        <div className={productStyles.dboard_footer}>
          <span className={productStyles.dboard_price}>
            ${price.toFixed(2)}
          </span>
          <button className={productStyles.dboard_cartbutton}>
            <FaShoppingCart /> 
          </button>
          <button className={productStyles.dboard_listbutton}
          onClick={() => onDetailsClick(product)} >
            <FaInfoCircle /> 
          </button>

        </div>
      </div>
    </div>
  )
}

export default ProductCard
