import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Dashboard from './Dashboard';
import CreateQR from './CreateQR';
import EditForm from './EditForm';
import AddForm from './AddForm';

const App = () => {
  const [qrCodeId, setQrCodeId] = useState(null);

  const handleQRCodeSelection = (id) => {
    setQrCodeId(id);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard onQRCodeSelect={handleQRCodeSelection} />} />
        <Route path="/create" element={<CreateQR />} />
        <Route path="/add/:id" element={<AddForm qrCodeId={qrCodeId} />} />
        <Route path="/edit/:id" element={<EditForm qrCodeId={qrCodeId} clearSelected={() => setQrCodeId(null)}/>} />
      </Routes>
    </Router>
  );
}

export default App;