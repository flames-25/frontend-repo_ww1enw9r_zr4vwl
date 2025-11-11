import { ShoppingCart, Image as ImageIcon } from 'lucide-react'

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden">
      <div className="aspect-square bg-gray-50 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <ImageIcon className="w-12 h-12 mb-2" />
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1" title={product.title}>{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 min-h-[2.5rem]">{product.description || '—'}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price?.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
