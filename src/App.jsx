import { Routes,Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Dashboard from './assets/Pages/Dashboard'

function App() {
  return (

    <Routes>
      <Route element={<MainLayout/>}>
      <Route path="/" element={<Dashboard/>}/>
      </Route>
    </Routes>
  )
}

export default App
