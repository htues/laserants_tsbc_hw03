import { prismaMock } from '../prismaClientMock'
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../../src/api/repositories/productRepository'
import { Product, Category } from '@prisma/client'
import Decimal from 'decimal.js'

describe('productRepository', () => {
  const mockCategory: Category = {
    id: 1,
    name: 'Electronics',
    description: 'Electronic items',
    status: true,
  }
  const mockProduct: Product = {
    id: 1,
    name: 'Laptop',
    description: 'A powerful laptop',
    price: new Decimal(12.0),
    imageUrl: 'http://fake.com/image.png',
    status: true,
    categoryId: 1,
  }

  beforeEach(() => {
    prismaMock.product.findMany.mockReset()
    prismaMock.product.findUnique.mockReset()
    prismaMock.product.create.mockReset()
    prismaMock.product.update.mockReset()
    prismaMock.product.delete.mockReset()
  })

  it('should get all products', async () => {
    prismaMock.product.findMany.mockResolvedValue([mockProduct])

    const products = await getProducts()
    expect(products).toEqual([mockProduct])
    expect(prismaMock.product.findMany).toHaveBeenCalled()
  })

  it('should get a product by id', async () => {
    prismaMock.product.findUnique.mockResolvedValue(mockProduct)

    const product = await getProductById(1)
    expect(product).toEqual(mockProduct)
    expect(prismaMock.product.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { category: true },
    })
  })

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Smartphone',
      description: 'A new smartphone',
      price: new Decimal(699.99),
      imageUrl: 'http://fake.com/smartphone.png',
      status: true,
      categoryId: 1,
    }
    prismaMock.product.create.mockResolvedValue({
      id: 2,
      ...newProduct,
    })

    const product = await createProduct(newProduct)
    expect(product).toEqual({ id: 2, ...newProduct, categoryId: 1 })
    expect(prismaMock.product.create).toHaveBeenCalledWith({ data: newProduct })
  })

  it('should update a product', async () => {
    const updatedProduct = {
      name: 'Gaming Laptop',
      description: 'A powerful gaming laptop',
      price: new Decimal(1299.99),
      imageUrl: 'http://fake.com/gaming-laptop.png',
      status: true,
      categoryId: 1,
    }
    prismaMock.product.update.mockResolvedValue({
      id: 1,
      ...updatedProduct,
    })

    const product = await updateProduct(1, updatedProduct)
    expect(product).toEqual({ id: 1, ...updatedProduct, categoryId: 1 })
    expect(prismaMock.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedProduct,
    })
  })

  it('should delete a product', async () => {
    prismaMock.product.delete.mockResolvedValue(mockProduct)

    const product = await deleteProduct(1)
    expect(product).toEqual(mockProduct)
    expect(prismaMock.product.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })
})
