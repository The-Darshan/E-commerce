import React, { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addToCart } from '../slices/cartSlice'
import { Search, SlidersHorizontal } from 'lucide-react'

const CategoryProducts = () => {
  const { id } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products]
    
    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    switch (sortOrder) {
      case 'low-to-high':
        result.sort((a, b) => a.price - b.price)
        break
      case 'high-to-low':
        result.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }
    
    return result
  }, [products, searchQuery, sortOrder])

  useEffect(() => {
    const getAllCategoryProducts = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:5000/api/Categories/${id}`)
        console.log(res.data)
        if (res.data) {
          setProducts(res.data)
        }else{
            toast.error('No products found for this category.')
        }
      } catch
       (err) {
        console.error('Error fetching category products:', err)
      } finally {
        setLoading(false)
      }
    }

    getAllCategoryProducts()
  }, [id])

  const dispatch = useDispatch()

  const handleAddToCart = (p) => {
    dispatch(addToCart(p))
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-6 pt-28 mb-10">
        <div className="mb-4">
          <Link to="/" className="text-sm text-blue-600">&larr; Back to categories</Link>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="default">Sort by price</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-sm text-gray-600 bg-gray-50 p-8 rounded-lg text-center">
            Loading products...
          </div>
        )}

        {!loading && filteredAndSortedProducts.length === 0 && (
          <div className="text-sm text-gray-600 bg-gray-50 p-8 rounded-lg text-center">
            {searchQuery 
              ? 'No products found matching your search.' 
              : 'No products found for this category.'}
          </div>
        )}

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredAndSortedProducts.map((p) => (
            <div key={p.id} className="border rounded p-2 cursor-pointer hover:shadow-lg transition">
              <div className="aspect-[4/3] mb-2 overflow-hidden rounded bg-white">
                {
                  <img src={ p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                }
              </div>
              <div className="text-xl font-bold">{p.name}</div>
              <div className='text-sm'>{p.description.substr(0,50)+'...'}</div>
              {p.price !== undefined && <div className="text-lg font-bold text-gray-600">{'₹'}{p.price}</div>}
              <div>Stock Available :<span className='font-bold'> {p.stockCount}</span></div>

                <button onClick={() => handleAddToCart(p)} className="mt-2 w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-150">
                  Add to Cart
                </button>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
