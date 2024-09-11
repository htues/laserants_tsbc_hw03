import { Product } from './product.types'

export type Category = {
  id: number
  name: string | null
  description: string | null
  status: boolean
  products?: Product[]
}

export type CategoryResponse = {
  httpStatusCode: number
  category?: Category
  categories?: Category[]
}

export type CategoryState = {
  categories: Category[]
  category: Category | null
  loading: boolean
  status: 'idle' | 'loading' | 'fulfilled' | 'rejected'
  error: string | null
}

export type ApiError = {
  response: {
    data: {
      message: string
    }
  }
}
