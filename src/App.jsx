import { useEffect, useState } from 'react'
import ProductCard from './components/ProductCard'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cart, setCart] = useState([])

  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${backend}/api/products`)
        if (!res.ok) throw new Error('Failed to load products')
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [backend])

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id)
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-black text-xl">Shop Lite</div>
          <div className="text-sm text-gray-600">Cart: {cart.reduce((s,i)=>s+i.quantity,0)} • ${total.toFixed(2)}</div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse h-64 bg-gray-100 rounded-xl" />
            ))}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded">{error}</div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)
            )}
          </div>
        )}
      </main>

      {cart.length > 0 && (
        <footer className="fixed bottom-4 inset-x-0">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white shadow-lg border rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">{cart.length} item(s)</div>
                <div className="font-bold text-xl">Total ${total.toFixed(2)}</div>
              </div>
              <button
                onClick={() => alert('Checkout flow to be implemented')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
              >
                Checkout
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default App
