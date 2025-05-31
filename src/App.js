import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';  


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black-50 text-gray-800">
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
