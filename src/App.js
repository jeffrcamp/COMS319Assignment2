import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useLocation} from 'react-router-dom';
import logo from './logo.svg';  // If needed elsewhere, you can keep this import
import './App.css';
import CartView from './CartView';
import ConfirmationView from './ConfirmationView';
import Catalog from './Catalog';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/*Testing... goes to confirmation view just to show it works. Change it with catalog or cartview if you wanna see those*/}
          <Route path="/" element={<Navigate replace to="/cart" />} />
          <Route path="/cart" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
