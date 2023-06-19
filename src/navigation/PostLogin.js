import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Dashboard from '../screens/Dashboard'
import Profile from '../screens/Profile'



const PostLogin = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route index path='/' element={<Dashboard />} />
            <Route index path='/profile' element={<Profile />} />
        </Routes>
    </BrowserRouter>
  )
}

export default PostLogin