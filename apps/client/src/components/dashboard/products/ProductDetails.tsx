import Modal from '../../ui/forms/Modal'
import { ProductCardTypes } from '../../../types/product.types'
import { formStyles } from '../../ui/twind/styles'

const ProductDetails: React.FC<{
  product: ProductCardTypes['product']
  onClose: () => void
}> = ({ product, onClose }) => {
  const { name, price, description, imageUrl } = product

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  const displayPrice = typeof numericPrice === 'number' && !isNaN(numericPrice) ? numericPrice.toFixed(2) : 'N/A';

  return (
    <Modal onClose={onClose}>
      <img
        src={imageUrl}
        alt={name ?? ''}
        className={formStyles.modal_productdetails_image}
      />
      <h2 className={formStyles.modal_productdetails_name}>{name}</h2>
      <p className={formStyles.modal_productdetails_description}>
        {description}
      </p>
      <span className={formStyles.modal_productdetails_price}>
        ${displayPrice}
      </span>
    </Modal>
  )
}

export default ProductDetails
