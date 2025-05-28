import { Routes,Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './assets/Pages/Dashboard'
import CustomerManagement from './assets/Pages/CustomerManagement'
import SalesManagement from './assets/Pages/SalesManagement'
import RegistrationForm from './assets/Pages/Registration'
import Feedback from './assets/Pages/Feedback'
import FaqSection from './assets/Pages/FaqSection';
import WhatsappFloatingButton from './assets/Pages/WhatsappFloatingButton'; // ✅ Tambahkan ini
import FaqAdmin from './assets/Pages/FaqAdmin';
import Notifikasi from './assets/Pages/Notifikasi'
import Laporan from './assets/Pages/Laporan';;

function App() {
  return (
      <>
      <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="Pelanggan" element={<CustomerManagement/>}/>
      <Route path="/penjualan" element={<SalesManagement/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/faq" element={<FaqSection />} />
      <Route path="/admin/faq" element={<FaqAdmin />} />
      </Route>
      <Route path="/pendaftaran" element={<RegistrationForm/>}/>
      <Route path="notifikasi" element={<Notifikasi />} />
      <Route path="laporan" element={<Laporan />} />
    </Routes>
      <WhatsappFloatingButton /> {/* ✅ Tambahkan ini */}
    </>
    
  );
}

export default App;
