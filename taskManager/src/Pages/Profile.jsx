import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setprofileData } from '../slices/profile'

const Profile = () => {
  const [tab, setTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    contactNumber: '',
    address: '',
    dateOfBirth: '',
    gender: '0',
    id: ''
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile)

//   useEffect(() => {
//     // Fetch orders on mount
//     const fetchOrders = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/orders')
//         setOrders(res.data.map(order => ({
//           ...order,
//           date: format(new Date(order.createdAt), 'MMM dd, yyyy')
//         })))
//       } catch (err) {
//         console.error('Error fetching orders:', err)
//         toast.error('Failed to load orders')
//       }
//     }
//     fetchOrders()
//   }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Users');
        console.log(response.data);
        dispatch(setprofileData(response.data));
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUser();
    
    if (user?.profileData) {
      setFormData({
        username: user?.profileData?.username || '',
        contactNumber: user?.profileData?.contactNumber || '',
        address: user?.profileData?.address || '',
        dateOfBirth: user?.profileData?.dateOfBirth || '',
        gender: user?.profileData?.gender?.toString() || '0',
        id: user?.profileData?.id || ''
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(formData);

    try {
      await axios.put('http://localhost:5000/api/Users/updateUser', formData)
      toast.success('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile:', err)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        username: '',
        contactNumber: '',
        address: '',
        dateOfBirth: '',
        gender: '0'
      })
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-indigo-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="col-span-1 bg-white backdrop-blur-lg bg-opacity-80 shadow-lg rounded-xl p-6 border border-gray-100">
            <h3 className="text-xl font-semibold mb-6 text-indigo-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Account
            </h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => setTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                    tab === 'profile' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
                  }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => setTab('orders')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                    tab === 'orders' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'hover:bg-indigo-50 text-gray-700 hover:text-indigo-600'
                  }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Orders
                </button>
              </li>
            </ul>
          </aside>

          {/* Main */}
          <main className="col-span-1 md:col-span-3 bg-white backdrop-blur-lg bg-opacity-80 shadow-xl rounded-xl p-8 border border-gray-100">
            {tab === 'profile' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-indigo-900 flex items-center">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Your Profile</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white bg-opacity-90 hover:bg-opacity-100"
                          placeholder={formData?.username ||  'Enter your full name'}
                        />
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white bg-opacity-90 hover:bg-opacity-100"
                          placeholder={formData?.contactNumber || 'Enter your phone number'}
                        />
                      </div>
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white bg-opacity-90 hover:bg-opacity-100"
                        rows={3}
                        placeholder={formData?.address || 'Enter your address'}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white bg-opacity-90 hover:bg-opacity-100"
                        />
                      </div>

                      <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 bg-white bg-opacity-90 hover:bg-opacity-100"
                        >
                          <option value="0">Male</option>
                          <option value="1">Female</option>
                          <option value="2">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                        loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </span>
                      ) : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="px-6 py-3 border-2 border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            )}            {tab === 'orders' && (
              <div>
                <h2 className="text-3xl font-bold mb-8 text-indigo-900 flex items-center">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Your Orders</span>
                </h2>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((o, idx) => (
                      <div 
                        key={o.id ?? idx} 
                        className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-bold text-lg text-indigo-900">Order #{o.id ?? idx}</div>
                            <div className="text-sm text-gray-500 mt-1">{o.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">{'₹'}{o.total}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {o.items?.length ?? 0} {o.items?.length === 1 ? 'item' : 'items'}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            View Order Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Orders Yet</h3>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                    <Link to="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Profile
