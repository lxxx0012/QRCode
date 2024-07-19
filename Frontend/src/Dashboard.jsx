import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Components/css/Dashboard.css';
import AddForm from './AddForm';
import EditForm from './EditForm';

const Dashboard = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [selectedQR, setSelectedQR] = useState(null);
  const [selectedQRs, setSelectedQRs] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQR, setEditingQR] = useState(null);
  const [addingNew, setAddingNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQRCodes();
  }, []);

  const fetchQRCodes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/qrcodes');
      setQrCodes(response.data);
    } catch (error) {
      setError('Failed to fetch QR codes.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleSelect = (qrCode) => {
    if (selectedQRs.includes(qrCode._id)) {
      setSelectedQRs(selectedQRs.filter((id) => id !== qrCode._id));
    } else {
      setSelectedQRs([...selectedQRs, qrCode._id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedQRs([]);
    } else {
      setSelectedQRs(qrCodes.map((qrCode) => qrCode._id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = async () => {
    if (selectedQRs.length === 0) {
      window.alert('Please select at least one QR code for deletion.');
      return;
    }

    if (window.confirm('Are you sure you want to delete selected QR codes?')) {
      try {
        await Promise.all(selectedQRs.map((id) => axios.delete(`http://localhost:5000/api/qrcodes/${id}`)));
        setSelectedQRs([]);
        setSelectAll(false);
        fetchQRCodes();
      } catch (error) {
        setError('Failed to delete QR codes.');
      }
    }
  };

  const handleAddQR = () => {
    if (selectedQRs.length === 1) {
      const qrCode = qrCodes.find((qrCode) => qrCode._id === selectedQRs[0]); 
      setSelectedQR(qrCode);
      setAddingNew(true);
    setEditingQR(null);
    } else {
      window.alert('Please select only one QR code for addition.');
    }
  };

  const handleEditQR = (qrCode) => {
    setEditingQR(qrCode);
    setAddingNew(false);
    setSelectedQR(null);
    setSelectedQRs([]);
    setSelectAll(false);
  };

  const handleCancelEdit = () => {
    setEditingQR(null);
    setSelectedQR(null);
    setSelectedQRs([]);
    setSelectAll(false);
  };

  const handleUpdateQR = async (formData) => {
    try {
      await axios.put(`http://localhost:5000/api/qrcodes/${editingQR._id}`, formData);
      fetchQRCodes();
      setEditingQR(null);
    } catch (error) {
      setError('Failed to update QR code.');
    }
  };

  const handleAddFormSubmit = async (formData) => {
    const { name, urls } = formData;
    try {
      await axios.post('http://localhost:5000/api/qrcodes', { name, urls });
      fetchQRCodes();
    } catch (error) {
      setError('Failed to add QR code.');
    } finally {
      setAddingNew(false);
      setSelectedQR(null);
      setEditingQR(null);
      setSelectedQRs([]);
      setSelectAll(false);
    }
  };

  const handleAddFormCancel = () => {
    setAddingNew(false);
    setSelectedQR(null);
    setEditingQR(null);
    setSelectedQRs([]);
    setSelectAll(false);
  };

  const openMultipleUrls = (urls) => {
    urls.forEach((url) => {
      window.open(url, '_blank');
    });
  };

  const hasUrls = (qrCode) => qrCode.urls && Array.isArray(qrCode.urls) && qrCode.urls.length > 0;

  const deleteButtonLabel = () => {
    if (selectedQRs.length > 0) {
      return selectAll ? 'Delete All' : 'Delete Selected';
    } else {
      return 'Delete';
    }
  };

  const clearSelected = () => {
    setSelectedQRs([]);
    setSelectAll(false);
  };

  return (
    <div>
      <div className="header">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <nav className="side-nav">
        <ul>
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/create" end className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
              New QR
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <h2 className='dashboard-title'>Dashboard - List of Created QR Codes</h2>
        <div className="qr-codes-toolbar">
          <button onClick={handleDeleteSelected} disabled={selectedQRs.length === 0}>
            {deleteButtonLabel()}
          </button>
          <button onClick={handleAddQR} className="add-button">
            Add QR Code
          </button>
        </div>

        {addingNew && (
          <AddForm
            onSubmit={handleAddFormSubmit}
            onCancel={handleAddFormCancel}
            selectedQR={selectedQR}
          />
        )}

        {editingQR && (
          <EditForm
            qrCode={editingQR}
            onUpdate={handleUpdateQR}
            onCancel={handleCancelEdit}
            clearSelected={clearSelected}
          />
        )}

        {loading && <p>Loading QR codes...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && qrCodes.length === 0 && <p>No QR codes available.</p>}

        <ul className="qr-codes-list">
          {qrCodes.length > 0 && (
            <li className="qr-code-item header">
              <label className="select-all-checkbox">
                <h3><strong>Select All</strong></h3>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </label>
              <div className="name">
                <h3><strong>Name</strong></h3>
              </div>
              <div className="url">
                <h3><strong>URLs</strong></h3>
              </div>
              <div className="qr-code">
                <h3><strong>QR Code</strong></h3>
              </div>
              <div className="action">
                <h3><strong>Action</strong></h3>
              </div>
            </li>
          )}
          {qrCodes.map((qrCode) => (
            <li key={qrCode._id}>
              <label className="qr-item">
                <input
                  type="checkbox"
                  checked={selectedQRs.includes(qrCode._id)}
                  onChange={() => handleSelect(qrCode)}
                  className="qr-item-checkbox"
                />
                <div className="qr-item-name">
                  <h3>{qrCode.name}</h3>
                </div>
                <div className="qr-item-url">
                  {hasUrls(qrCode) ? (
                    <p>{qrCode.urls.join(', ')}</p>
                  ) : (
                    <p>No URLs</p>
                  )}
                </div>
                <div className="qr-item-code">
                  {qrCode.urls.length > 0 && (
                    <div onClick={() => {
                      const firstUrl = qrCode.urls[0];
                      const lastUrl = qrCode.urls[qrCode.urls.length - 1];
                      const fullUrl = lastUrl.startsWith('http://') || lastUrl.startsWith('https://') ? lastUrl : 'http://' + lastUrl;
                      window.open(fullUrl, '_blank');
                    }}>
                      <img
                        src={`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCode.urls[0])}&size=60x60`}
                        alt={`QR Code for ${qrCode.name}`}
                      />
                    </div>
                  )}
                </div>

                <div className="qr-item-action">
                  <button className="edit-button" onClick={() => handleEditQR(qrCode)}>Edit</button>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
