import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/rootSlice'
import loadData from '../../../api/loadData'
import { getProducts } from '../../redux/productSlice'
import { addItem } from '../../redux/scartSlice'
import { selectProducts } from '../../redux/productSelector'
import ProductCard from '../../ui/layout/ProductCard'
import ProductDetails from './ProductDetails'
import { productStyles } from '../../ui/twind/styles'
import { ProductCardTypes } from '../../../types/product.types'
import { CartItem } from '../../../types/scart.types'

const ViewProduct: React.FC = () => {
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery,
  )
  const [tries, setTries] = useState(0)
  const [visibleProducts, setVisibleProducts] = useState<
    ProductCardTypes['product'][]
  >([])
  const [selectedProduct, setSelectedProduct] = useState<
    ProductCardTypes['product'] | null
  >(null)
  const [page, setPage] = useState(1)
  const observer = useRef<IntersectionObserver | null>(null)
  const numberOfRowsPerPage = 2
  const columnsPerRow = 3

  useEffect(() => {
    const fetchProducts = async () => {
      await loadData(tries, setTries, getProducts, dispatch)
    }
    fetchProducts()
  }, [tries, dispatch])

  useEffect(() => {
    const loadMoreProducts = () => {
      const productsToLoad = numberOfRowsPerPage * columnsPerRow
      const filteredProducts = products.filter(
        (product) =>
          product.name &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      const newProducts = filteredProducts.slice(0, page * productsToLoad)
      setVisibleProducts(newProducts)
    }

    loadMoreProducts()
  }, [page, products, searchQuery])

  useEffect(() => {
    const handleObserver = (entities: IntersectionObserverEntry[]) => {
      const target = entities[0]
      if (target.isIntersecting) {
        setPage((prev) => prev + 1)
      }
    }

    observer.current = new IntersectionObserver(handleObserver)
    if (observer.current && observer.current.observe) {
      observer.current.observe(document.querySelector('#load-more')!)
    }

    return () => observer.current?.disconnect()
  }, [])

  const handleDetailsClick = (product: ProductCardTypes['product']) => {
    setSelectedProduct(product)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
  }

  const handleAddToCart = (product: ProductCardTypes['product']) => {
    const addToCartPayload: CartItem = {
      id: product.id,
      name: product.name ?? 'Unknown',
      price: product.price,
      quantity: 1,
    }
    dispatch(addItem(addToCartPayload))
  }

  return (
    <>
      <div className={productStyles.dboard_product_grid}>
        {visibleProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailsClick={handleDetailsClick}
            onAddToCartClick={handleAddToCart}
          />
        ))}
        <div id="load-more" className="h-10"></div>
      </div>
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={handleCloseDetails}
        />
      )}
    </>
  )
}

export default ViewProduct
