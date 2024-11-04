import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/register'
import UserDashboard from './pages/userDashboard'
import PrivateRoute from './components/auth/PrivateRoute'
import SheetPage from './pages/sheets/SheetPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
