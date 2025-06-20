import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './assets/Pages/Admin/Dashboard';
import CustomerManagement from './assets/Pages/Admin/CustomerManagement';
import SalesManagement from './assets/Pages/Admin/SalesManagement';
import Feedback from './assets/Pages/Customer/Feedback';
import FaqSection from './assets/Pages/Customer/FaqSection';
import WhatsappFloatingButton from './assets/Pages/Customer/WhatsappFloatingButton';
import FaqAdmin from './assets/Pages/Admin/FaqAdmin';
import Notifikasi from './assets/Pages/Customer/Notifikasi'
import Laporan from './assets/Pages/Admin/Laporan';
import LandingPage from './assets/Pages/Landing';
import BookingSchedule from './assets/Pages/Customer/BookingSchedule';
import PromoRoyalty from './assets/Pages/Customer/PromoRoyalty';
import Class from './assets/Pages/Customer/Class';
import HelpCenter from './assets/Pages/Customer/HelpCenter';

function App() {
  return (
    <>
      <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="Pelanggan" element={<CustomerManagement/>}/>
      <Route path="/penjualan" element={<SalesManagement/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/faq" element={<FaqSection />} />
      <Route path="/admin/faq" element={<FaqAdmin />} />
      <Route path="notifikasi" element={<Notifikasi />} />
      <Route path="laporan" element={<Laporan />} />
      <Route path="BookingSchedule" element={<BookingSchedule/>} />
      <Route path="PromoRoyalty" element={<PromoRoyalty />} />
      <Route path="help" element={<HelpCenter />} />
      <Route path="/class" element={<Class />} />

      </Route>
      <Route path="/" element={<LandingPage />} />
      
      
    </Routes>
      <WhatsappFloatingButton /> {/* ✅ Tambahkan ini */}
    </>
  );
}
export default App;
