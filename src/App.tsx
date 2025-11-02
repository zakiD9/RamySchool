import { Route, Routes } from 'react-router-dom'
import Director from './pages/Director'
import Receptionist from './pages/Receptionist'
import Login from './pages/Login'

function App() {

  return (
    <>
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/director" element={<Director />} />
        <Route path="/receptionist" element={<Receptionist />} />
      </Routes>
    </>
  )
}

export default App
