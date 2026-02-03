const DEFAULT_API_BASE_URL = "http://localhost:4000"

const apiBaseCandidates = [
  process.env.NEXT_PUBLIC_API_URL,
  process.env.NEXT_PUBLIC_BACKEND_URL,
  process.env.NEXT_PUBLIC_SERVER_URL,
  process.env.NEXT_PUBLIC_API_BASE_URL,
].filter((candidate): candidate is string => typeof candidate === "string" && candidate.trim().length > 0)

const API_BASE_URL = (apiBaseCandidates[0] ?? DEFAULT_API_BASE_URL).replace(/\/$/, "")

const getAuthHeaders = () => {
  if (typeof window === "undefined") {
    return {}
  }
  try {
    const token = window.localStorage?.getItem("fanty_token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  } catch {
    return {}
  }
}

interface RequestOptions extends RequestInit {
  path: string
}

async function apiRequest<T>({ path, headers, ...options }: RequestOptions): Promise<T> {
  const url = `${API_BASE_URL}${path}`
  const defaultHeaders = options.body ? { "Content-Type": "application/json" } : {}
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      ...defaultHeaders,
      ...getAuthHeaders(),
      ...headers,
    } as HeadersInit,
    ...options,
  })

  if (!response.ok) {
    const message = await response
      .json()
      .catch(() => ({ error: response.statusText || "Request failed" }))
    throw new Error(message.error || "Unable to complete request")
  }

  return response.json()
}

export interface ApiProduct {
  id?: string
  _id?: string
  productId?: string | null
  productName: string
  notes: string
  price: string
  productImage?: string | null
  category?: string
  expiringDate?: string | null
  quantity?: number | null
  createdAt?: string
  updatedAt?: string
  publishStatus?: "yes" | "no"
}

export interface OrderItemPayload {
  productId: string
  name: string
  quantity: number
  price: number
  total: number
}

export interface OrderPayload {
  orderId?: string
  customerName: string
  contact: string
  address: string
  notes?: string
  paymentMethod: "cash" | "orange-money" | "afri-money"
  items: OrderItemPayload[]
  totals: {
    subtotal: number
    grandTotal: number
  }
}

export interface OrderResponse {
  orderId?: string
  order?: {
    id?: string
    orderId?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

export async function fetchProductsFromApi(): Promise<ApiProduct[]> {
  const result = await apiRequest<{ products: ApiProduct[] }>({
    path: "/api/products",
    method: "GET",
  })
  return result.products ?? []
}

export async function submitOrder(payload: OrderPayload): Promise<OrderResponse> {
  return apiRequest<OrderResponse>({
    path: "/api/orders",
    method: "POST",
    body: JSON.stringify(payload),
  })
}


