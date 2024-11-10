import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/register'
import UserDashboard from './pages/userDashboard'
import PrivateRoute from './components/auth/PrivateRoute'
import SheetPage from './pages/sheets/SheetPage'
import CreateSheet from './pages/sheets/CreateSheet'
import CreateCampaign from './pages/campaing/CreateCampaing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/sheetPage/:idParam" element={<SheetPage />} />
          <Route path="/createSheet" element={<CreateSheet/>} />
          <Route path="/createCampaing" element={<CreateCampaign/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
