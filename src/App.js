import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Forget from './components/Forget';
import Login from './components/Login';
import Register from './components/Register';
import { Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
    <section className="app wrapper container">
      <nav>
        <Link to="/">Login</Link>
        
        
        <Link to="/register">Register</Link>
      </nav>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forget" element={<Forget />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user" element={<Dashboard />} />
    </Routes>
  </section>
  </Router>
  );
}

export default App;
