import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removefromCart, resetCart } from '../slices/cartSlice'
import toast from 'react-hot-toast'
import { Loader2, MinusCircle, PlusCircle, ShoppingBag, Trash2 } from 'lucide-react'

const Cart = () => {
  const dispatch = useDispatch()
  // const navigate = useNavigate()
  const cart = useSelector((state) => state.cart)
  // const profile = useSelector((state) => state.profile.profileData)
  const [isLoading, setIsLoading] = useState(false)

  const handleRemove = (item) => {
    dispatch(removefromCart(item))
  }

  const handleCheckout = async () => {
 
    try {
      setIsLoading(true)
      
      // const orderData = {
      //   userId: profile.id,
      //   items: cart.items.map(item => ({
      //     productId: item.id,
      //     name: item.name,
      //     price: item.price,
      //     quantity: 1 
      //   })),
      //   totalAmount: cart.total,
      //   orderDate: new Date().toISOString(),
      //   shippingAddress: profile.address || 'Default Address' // You can add address selection later
      // }

      // await new Promise(resolve => setTimeout(resolve, 1500))
      
      // // Save order to local storage for now
      // const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      // orders.push(orderData)
      // localStorage.setItem('orders', JSON.stringify(orders))

      toast.success('Order placed successfully!')
      dispatch(resetCart())
  
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
      console.error('Checkout error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-indigo-900">
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Your Cart</span>
        </h2>

        {cart.items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-indigo-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
            <Link to="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-lg overflow-hidden">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name} 
                          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" 
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                            <div className="text-sm text-gray-500 mt-1">Stock: {item.stockCount}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                              ₹{item.price }
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        
                          <button
                            onClick={() => handleRemove(item)}
                            className="inline-flex items-center px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <Trash2 size={18} className="mr-2" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span>{cart.totalItems}</span>
                  </div>

                  <div className="flex justify-between font-semibold text-lg pt-3 border-t border-gray-100">
                    <span>Total Amount</span>
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                      ₹{cart.total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-200 transform transition-all duration-200 flex items-center justify-center ${
                    !isLoading && 'hover:shadow-xl hover:scale-[1.02]'
                  } ${isLoading && 'opacity-80 cursor-not-allowed'}`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={20} />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
