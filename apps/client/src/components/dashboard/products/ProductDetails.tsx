import { useEffect, useRef } from 'react'
import { productStyles } from '../../ui/twind/styles'
import { ProductCardTypes } from '../../../types/product.types'

const ProductDetails: React.FC<{
  product: ProductCardTypes['product']
  onClose: () => void
}> = ({ product, onClose }) => {
  const { name, price, description, imageUrl } = product
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return (
    <div className={productStyles.modal}>
      <div className={productStyles.modal_content}>
        <span className={productStyles.modal_close} onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt={name} className={productStyles.modal_image} />
        <h2 className={productStyles.modal_name}>{name}</h2>
        <p className={productStyles.modal_description}>{description}</p>
        <span className={productStyles.modal_price}>${price.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default ProductDetails
