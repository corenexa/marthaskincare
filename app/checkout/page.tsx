"use client"

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, AlertCircle, CheckCircle2, ReceiptText } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import { submitOrder, type OrderPayload } from "@/lib/api"

type PaymentMethod = "cash" | "orange-money" | "afri-money"

const paymentOptions: {
  value: PaymentMethod
  title: string
  description: string
}[] = [
  {
    value: "cash",
    title: "Cash on Delivery",
    description: "Pay with cash when your order arrives.",
  },
  {
    value: "orange-money",
    title: "Orange Money",
    description: "Send the transfer before dispatch. Instructions will appear below.",
  },
  {
    value: "afri-money",
    title: "AfriMoney",
    description: "Pay via AfriMoney before we send out your parcel.",
  },
]

const paymentInstructions: Record<Exclude<PaymentMethod, "cash">, string> = {
  "orange-money":
    "Open your Orange Money app or dial *144#. Send the total amount to 079-000-111 (FantyFresh). Add your name in the reference.",
  "afri-money":
    "Dial *161# or use your AfriMoney app. Transfer the total to 088-222-555 (FantyFresh). Use your order ID as the reference.",
}

interface ReceiptData {
  receiptCode: string
  orderId: string
  placedAt: string
  paymentMethod: PaymentMethod
  customer: {
    name: string
    contact: string
    address: string
    notes?: string
  }
  items: {
    name: string
    quantity: number
    price: number
    total: number
  }[]
  totals: {
    subtotal: number
    grandTotal: number
  }
}

const currency = (value: number | string | null | undefined) => {
  const numeric = Number(value ?? 0)
  const safeValue = Number.isFinite(numeric) ? numeric : 0
  return `Nle${safeValue.toFixed(2)}`
}

// Generate a unique 6-character alphanumeric receipt code
function generateReceiptCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Excluding similar looking chars
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash")
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    notes: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<ReceiptData | null>(null)

  const subtotal = useMemo(() => getTotalPrice(), [cart, getTotalPrice])
  const grandTotal = subtotal

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const formValid = cart.length > 0 && Boolean(form.name && form.contact && form.address && paymentMethod)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formValid) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Generate receipt code on frontend
      const receiptCode = generateReceiptCode()
      
      // Prepare payload matching backend expectations
      const payload: OrderPayload = {
        receiptCode,
        orderNumber: receiptCode, // Use same code for order number
        customerName: form.name,
        contact: form.contact,
        address: form.address,
        notes: form.notes || undefined,
        customer: {
          name: form.name,
          phone: form.contact,
        },
        shippingAddress: {
          address: form.address,
        },
        // Store payment method in metadata since backend doesn't have a paymentMethod field
        metadata: {
          paymentMethod,
        },
        items: cart.map((item) => ({
          productId: item.productId ?? item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
          image: item.image,
        })),
        discount: 0,
      }

      const response = await submitOrder(payload)

      // Extract order from response
      const order = response?.order || response

      if (!order) {
        throw new Error("Invalid response from server")
      }

      // Build receipt data
      setReceipt({
        receiptCode: order.receiptCode || receiptCode,
        orderId: order.id || order._id || "",
        placedAt: order.createdAt || new Date().toISOString(),
        paymentMethod,
        customer: {
          name: order.customer?.name || form.name,
          contact: order.customer?.phone || form.contact,
          address: order.shippingAddress?.address || form.address,
          notes: order.notes || form.notes,
        },
        totals: {
          subtotal: order.subtotal ?? subtotal,
          grandTotal: order.total ?? grandTotal,
        },
        items: order.items || cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
      })
      
      clearCart()
    } catch (err) {
      console.error("Order submission error:", err)
      setError(err instanceof Error ? err.message : "Unable to complete your order right now.")
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => router.push("/")

  const printReceipt = () => {
    window.print()
  }

  return (
    <section className="min-h-screen bg-secondary/20 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline print:hidden"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 space-y-10">
          <div>
            <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">Checkout</p>
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h1 className="text-4xl font-bold text-foreground">Complete your order</h1>
              <p className="text-foreground/70">Secure checkout • Fast delivery • Friendly support</p>
            </div>
          </div>

          {cart.length === 0 && !receipt && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center space-y-4">
              <AlertCircle className="w-10 h-10 mx-auto text-accent" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p className="text-foreground/70 mb-6">Add a few of your favorite products before checking out.</p>
                <button
                  onClick={goBack}
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                >
                  Browse products
                </button>
              </div>
            </div>
          )}

          <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              {receipt ? (
                <div className="border border-green-200 bg-green-50 rounded-2xl p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm uppercase tracking-wide text-green-700 font-semibold">Order confirmed</p>
                      <h2 className="text-2xl font-bold text-green-900">Receipt #{receipt.receiptCode}</h2>
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Customer</p>
                      <p className="font-semibold">{receipt.customer.name}</p>
                      <p className="text-sm text-foreground/70">{receipt.customer.contact}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Delivery address</p>
                      <p className="font-semibold">{receipt.customer.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Order ID</p>
                      <p className="font-mono text-xs">{receipt.orderId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Order date</p>
                      <p className="text-sm">{new Date(receipt.placedAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {receipt.customer.notes && (
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Notes</p>
                      <p className="text-sm">{receipt.customer.notes}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Items</p>
                    <div className="space-y-3">
                      {receipt.items.map((item, index) => (
                        <div key={`${item.name}-${index}`} className="flex items-center justify-between text-sm">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-foreground/60">
                              Qty {item.quantity} · {currency(item.price)} each
                            </p>
                          </div>
                          <p className="font-semibold">{currency(item.total)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-green-100 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground/60">Payment method</p>
                      <p className="font-semibold capitalize">{receipt.paymentMethod.replace("-", " ")}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-foreground/60">Grand total</p>
                      <p className="text-2xl font-bold text-green-800">{currency(receipt.totals.grandTotal)}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 print:hidden">
                    <button
                      onClick={printReceipt}
                      className="flex-1 px-6 py-3 rounded-full border border-green-600 text-green-700 font-semibold hover:bg-green-100 transition"
                    >
                      Print receipt
                    </button>
                    <button
                      onClick={goBack}
                      className="flex-1 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
                    >
                      Continue shopping
                    </button>
                  </div>
                </div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Customer details</h2>
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Enter your full name"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Contact (phone or email)</label>
                        <input
                          type="text"
                          name="contact"
                          value={form.contact}
                          onChange={handleChange}
                          required
                          placeholder="+232 70 123456"
                          className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Delivery address</label>
                      <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        placeholder="Street, city & any landmarks"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notes (optional)</label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Drop-off instructions or anything else we should know"
                        rows={4}
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Payment method</h2>
                    <div className="grid gap-4 lg:grid-cols-3">
                      {paymentOptions.map((option) => {
                        const selected = paymentMethod === option.value
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setPaymentMethod(option.value)}
                            className={`text-left p-4 rounded-2xl border transition ${
                              selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                            }`}
                          >
                            <p className="font-semibold capitalize">{option.title}</p>
                            <p className="text-sm text-foreground/60 mt-1">{option.description}</p>
                          </button>
                        )
                      })}
                    </div>

                    {paymentMethod !== "cash" && (
                      <div className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-4 text-sm text-foreground/80">
                        <p className="font-semibold mb-1">Transfer instructions</p>
                        <p>{paymentInstructions[paymentMethod]}</p>
                        <p className="mt-2 text-foreground/60">
                          Once the transfer is done, tap "Complete order" and keep your transaction confirmation handy.
                        </p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 text-red-900 px-4 py-3 text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!formValid || loading}
                    className="w-full rounded-full bg-primary text-primary-foreground py-4 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <ReceiptText className="w-5 h-5" />
                        Complete order
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <aside className="bg-secondary/40 rounded-2xl p-6 space-y-6 print:hidden">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="space-y-4">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold truncate">{item.name}</p>
                          <button
                            className="text-sm text-red-500 hover:underline flex-shrink-0"
                            onClick={() => removeFromCart(item.id)}
                            type="button"
                          >
                            Remove
                          </button>
                        </div>
                        <p className="text-sm text-foreground/60">{currency(item.price)} each</p>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="font-medium min-w-[2ch] text-center">{item.quantity}</span>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-semibold flex-shrink-0">{currency(item.price * item.quantity)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-foreground/60">Add items from the product page to see them here.</p>
                )}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-foreground/70">
                  <span>Delivery</span>
                  <span>Calculated at dispatch</span>
                </div>
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{currency(grandTotal)}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}