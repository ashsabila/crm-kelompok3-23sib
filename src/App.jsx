import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './assets/Pages/Dashboard';
import CustomerManagement from './assets/Pages/CustomerManagement';
import SalesManagement from './assets/Pages/SalesManagement';
import Feedback from './assets/Pages/Feedback';
import FaqSection from './assets/Pages/FaqSection';
import WhatsappFloatingButton from './assets/Pages/WhatsappFloatingButton';
import FaqAdmin from './assets/Pages/FaqAdmin';
import Notifikasi from './assets/Pages/Notifikasi'
import Laporan from './assets/Pages/Laporan';
import LandingPage from './assets/Pages/Landing';
import RegistrationPage from './assets/Pages/RegistrationPage';
import LoginPage from './assets/Pages/LoginPage';
import BookingSchedule from './assets/Pages/BookingSchedule';
import PromoRoyalty from './assets/Pages/PromoRoyalty';
import Class from './assets/Pages/Class';
import FromClass from './assets/Pages/FormClass';
import Profile from './assets/Pages/Profile';
import Settings from './assets/Pages/Setting';

function App() {
  return (
    <>
      <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="Pelanggan" element={<CustomerManagement/>}/>
      <Route path="/penjualan" element={<SalesManagement/>}/>
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/faq" element={<FaqSection />} />
      <Route path="/admin/faq" element={<FaqAdmin />} />
      <Route path="notifikasi" element={<Notifikasi />} />
      <Route path="laporan" element={<Laporan />} />
      <Route path="BookingSchedule" element={<BookingSchedule/>} />
      <Route path="PromoRoyalty" element={<PromoRoyalty />} />
      <Route path="/class" element={<Class />} />
      <Route path="/FormClass" element={<FromClass />} />

      </Route>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pendaftaran" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      
      
    </Routes>
      <WhatsappFloatingButton /> {/* ✅ Tambahkan ini */}
    </>
  );
}
export default App;
