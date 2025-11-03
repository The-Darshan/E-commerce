import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducer/index.js'
import { Toaster } from 'react-hot-toast'

const shop = configureStore({
  reducer:rootReducer
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={shop}>
    <BrowserRouter>
    <App />
    <Toaster/>
    </BrowserRouter>
    </Provider>
  </StrictMode>

)
