import Modal from '../../ui/forms/Modal'
import { ProductCardTypes } from '../../../types/product.types'
import { formStyles } from '../../ui/twind/styles'

const ProductDetails: React.FC<{
  product: ProductCardTypes['product']
  onClose: () => void
}> = ({ product, onClose }) => {
  const { name, price, description, imageUrl } = product

  return (
    <Modal onClose={onClose}>
      <img
        src={imageUrl}
        alt={name}
        className={formStyles.modal_productdetails_image}
      />
      <h2 className={formStyles.modal_productdetails_name}>{name}</h2>
      <p className={formStyles.modal_productdetails_description}>
        {description}
      </p>
      <span className={formStyles.modal_productdetails_price}>
        ${price.toFixed(2)}
      </span>
    </Modal>
  )
}

export default ProductDetails
