
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Reserva } from '../Reserva/Reserva';
import { Profile } from '../Profile/Profile';
import { Games } from '../Games/Games';
import { Tables } from '../Tables/Tables';
import { AdminPannel } from '../AdminPannel/AdminPannel';
import { ReservasPannel } from '../ReservasPannel/ReservasPannel';
export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Home />} />
     
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />

      <Route path='/reserva' element={<Reserva />} />
      <Route path='/profile' element={<Profile />} />

      <Route path='/games' element={<Games />} />
      <Route path='/tables' element={<Tables />} />
      <Route path ='/reservas' element={<ReservasPannel />} />

      <Route path='/admin' element={<AdminPannel />} />
     
      
    </Routes>
  )
}