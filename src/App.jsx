import { Routes,Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './assets/Pages/Dashboard'
import CustomerManagement from './assets/Pages/CustomerManagement'
import SalesManagement from './assets/Pages/SalesManagement'
import Notifikasi from './assets/Pages/Notifikasi'
import Laporan from './assets/Pages/Laporan';;

function App() {
  return (

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="Pelanggan" element={<CustomerManagement/>}/>
      <Route path="Penjualan" element={<SalesManagement/>}/>
      <Route path="notifikasi" element={<Notifikasi />} />
      <Route path="laporan" element={<Laporan />} />
      </Route>
    </Routes>
  )
}

export default App
