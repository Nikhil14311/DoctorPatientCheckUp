import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from '../screens/Dashboard'
import Login from '../screens/Login'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import PostLogin from './PostLogin'

const Prelogin = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index path='/' element={<Login />} />
            <Route index path='/register' element={<Register />} />
            <Route path='/postlogin' element={<PostLogin />} />
        </Routes>
    </BrowserRouter>
  )
}

export default Prelogin