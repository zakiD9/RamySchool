import { Route, Routes } from 'react-router-dom'
import Director from './pages/Director'
import Receptionist from './pages/Receptionist'
import Login from './pages/Login'
import DirectorDashboard from './components/pages/director/dashboard/dashboardSection'

function App() {

  return (
    <>
     <Routes>
        <Route path="/login" element={<Login />} />
         <Route path="/director" element={<Director />}>
            <Route path="dashboard" element={<DirectorDashboard />} />
            <Route path="teachers" element={<div>Teacher Revenue</div>} />
            <Route path="logout" element={<div>Log Out</div>} />
          </Route>

          <Route path="/receptionist" element={<Receptionist />}>
            <Route path="dashboard" element={<div>dashboard</div>} />
            <Route path="teachers" element={<div>Teachers management</div>} />
            <Route path="students" element={<div>students management</div>} />
            <Route path="sessions" element={<div>sessions management</div>} />
            <Route path="presences" element={<div>presences management</div>} />
            <Route path="groups" element={<div>groups management</div>} />
            <Route path="logout" element={<div>Log Out</div>} />
          </Route>
      </Routes>
    </>
  )
}

export default App
