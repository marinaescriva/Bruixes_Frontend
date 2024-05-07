
import { Routes, Route } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Reserva } from '../Reserva/Reserva';
import { Profile } from '../Profile/Profile';
export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/" element={<Home />} />
     
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />

      <Route path='/reserva' element={<Reserva />} />
      <Route path='/profile' element={<Profile />} />
      
    </Routes>
  )
}