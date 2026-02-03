export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string | null
  category: string
  productId?: string | null
  expiringDate?: string | null
  // quantity?: number | null
  publishStatus?: "yes" | "no"
}
