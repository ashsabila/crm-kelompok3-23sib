import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './assets/Pages/Dashboard';
import SalesManagement from './assets/Pages/SalesManagement';
import FaqSection from './assets/Pages/FaqSection';
import WhatsappFloatingButton from './assets/Pages/WhatsappFloatingButton'; // ✅ Tambahkan ini

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/penjualan" element={<SalesManagement />} />
          <Route path="/faq" element={<FaqSection />} />
        </Route>
      </Routes>
      <WhatsappFloatingButton /> {/* ✅ Tambahkan ini */}
    </>
  );
}

export default App;
