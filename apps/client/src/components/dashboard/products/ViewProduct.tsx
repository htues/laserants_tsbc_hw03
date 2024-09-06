import { useState, useEffect, useRef } from 'react'
import { ProductCardTypes } from '../../../types/product.types'
import ProductCard from '../../ui/layout/ProductCard'
import { productStyles } from '../../ui/twind/styles'

const mockProducts: ProductCardTypes['product'][] = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for product 1',
    price: 10.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for product 2',
    price: 12.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Description for product 3',
    price: 15.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Description for product 4',
    price: 9.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 5,
    name: 'Product 5',
    description: 'Description for product 5',
    price: 8.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 6,
    name: 'Product 6',
    description: 'Description for product 6',
    price: 11.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 7,
    name: 'Product 7',
    description: 'Description for product 7',
    price: 13.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 8,
    name: 'Product 8',
    description: 'Description for product 8',
    price: 14.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 9,
    name: 'Product 9',
    description: 'Description for product 9',
    price: 16.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 10,
    name: 'Product 10',
    description: 'Description for product 10',
    price: 17.99,
    imageUrl: 'https://via.placeholder.com/150',
  },
]

const ViewProduct: React.FC = () => {
  const [visibleProducts, setVisibleProducts] = useState<
    ProductCardTypes['product'][]
  >([])
  const [page, setPage] = useState(1)
  const observer = useRef<IntersectionObserver | null>(null)
  const numberOfRowsPerPage = 2
  const columnsPerRow = 3

  useEffect(() => {
    const loadMoreProducts = () => {
      const productsToLoad = numberOfRowsPerPage * columnsPerRow
      const newProducts = mockProducts.slice(0, page * productsToLoad)
      setVisibleProducts(newProducts)
    }

    loadMoreProducts()
  }, [page])

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

  return (
    <div className={productStyles.dboard_product_grid}>
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div id="load-more" className="h-10"></div>
    </div>
  )
}

export default ViewProduct
