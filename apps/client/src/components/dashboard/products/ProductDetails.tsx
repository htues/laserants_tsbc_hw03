import { productStyles } from "../../ui/twind/styles";
import { ProductCardTypes } from "../../../types/product.types";

const ProductDetails: React.FC<{ product: ProductCardTypes['product'], onClose: () => void }> = ({ product, onClose }) => {
  const { name, price, description, imageUrl } = product
  return (
    <div className={productStyles.modal}>
      <div className={productStyles.modal_content}>
        <span className={productStyles.modal_close} onClick={onClose}>&times;</span>
        <img src={imageUrl} alt={name} className={productStyles.modal_image} />
        <h2 className={productStyles.modal_name}>{name}</h2>
        <p className={productStyles.modal_description}>{description}</p>
        <span className={productStyles.modal_price}>${price.toFixed(2)}</span>
      </div>
    </div>
  )
}

export default ProductDetails