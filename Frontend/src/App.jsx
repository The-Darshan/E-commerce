import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import CategoryProducts from './Pages/CategoryProducts'
import Cart from './Pages/Cart'
import Profile from './Pages/Profile'
import Footer from './Components/Footer'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/signup'
import { useSelector } from 'react-redux'

const App = () => {
  const theme = useSelector(state => state.theme.theme);
  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-gray-900 min-h-screen'}>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/category/:id' element={<CategoryProducts/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>}/>
        <Route path='*' element={<h1 className='text-center mt-20 text-3xl'>404 - Page Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
