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
import JoinCampaign from './pages/campaing/JoinCampaign'
import CampaignDetail from './pages/campaing/BoardCampaing'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/sheet-page/:idParam" element={<SheetPage />} />
          <Route path="/create-sheet" element={<CreateSheet/>} />
          <Route path="/create-campaing" element={<CreateCampaign/>}/>
          <Route path="/join-campaign" element={<JoinCampaign />} />
          <Route path="/board-campaing/:token" element={<CampaignDetail/>}/>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
