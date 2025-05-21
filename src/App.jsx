import { Routes,Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './assets/Pages/Dashboard'
import CustomerManagement from './assets/Pages/CustomerManagement'

function App() {
  return (

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="Pelanggan" element={<CustomerManagement/>}/></Route>
    </Routes>
  )
}

export default App
