import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination , Autoplay , Navigation } from 'swiper/modules'; 

const Home = () => {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const navigate = useNavigate()

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/Categories')
      console.log(response.data)
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  
  useEffect(() => {
    fetchCategories();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 pt-16 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Explore Categories
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across various categories. Find exactly what you're looking for!
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">Loading categories...</p>
            </div>
          </div>
        ) : (
          <div className="relative px-4 py-8">
            <Swiper
              loop={true}
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{
                dynamicBullets: true,
                clickable: true
              }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 }
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false
              }}
              className="py-8"
            >
              {categories.map((cat) => (
                <SwiperSlide key={cat.id ?? cat._id ?? cat.name}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigate(`/category/${cat?.id}`);
                    }}
                    className={`w-full h-full text-left rounded-2xl transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden ${
                      selectedCategory && 
                      (selectedCategory.id ?? selectedCategory._id ?? selectedCategory.name) === 
                      (cat.id ?? cat._id ?? cat.name)
                        ? 'ring-4 ring-indigo-500 ring-offset-2'
                        : ''
                    }`}
                  >
                    <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-100 to-white shadow-lg">
                      <img 
                        src={cat.imageUrl} 
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="text-white font-semibold text-lg text-center backdrop-blur-sm bg-white/10 rounded-lg py-2">
                          {cat.name}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Click to explore
                      </p>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
