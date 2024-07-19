import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Components/css/EditForm.css';

const BASE_URL = 'http://localhost:5000';

const EditForm = ({ qrCode, onUpdate, onCancel, clearSelected }) => {
  const [name, setName] = useState('');
  const [urls, setUrls] = useState(['']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (qrCode) {
      setName(qrCode.name || '');
      setUrls(qrCode.urls || ['']);
    }
  }, [qrCode]);

  const handleUpdate = async () => {
    if (!name || urls.some(url => !url)) {
      alert('Please enter Name and all URLs.');
      return;
    }

    try {
      await axios.put(`${BASE_URL}/api/qrcodes/${qrCode._id}`, { name, urls });
      onUpdate({ _id: qrCode._id, name, urls });
    } catch (error) {
      console.error('Error updating QR Code:', error);
      alert('Failed to update QR code. Please try again.');
    }
  };

  const handleCancel = () => {
    onCancel();
    clearSelected();
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleAddUrlField = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrlField = (index) => {
    if (urls.length > 1) {
      setUrls(urls.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="edit-form">
      <h3>Edit Selected QR Code</h3>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>URLs:</label>
        {urls.map((url, index) => (
          <div key={index} className="url-input">
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
            />
            <button type="button" onClick={() => handleRemoveUrlField(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddUrlField}>
          Add Another URL
        </button>
      </div>
      <div className="form-actions">
        <button onClick={handleUpdate} className='update-button'>Update</button>
        <button onClick={handleCancel} className='cancel-button'>Cancel</button>
      </div>
      <div className="qr-code-preview">
        <h4>QR Code Preview:</h4>
        {urls.map((url, index) => (
          <img
            key={index}
            src={`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(url)}&size=60x60`}
            alt={`QR Code for ${name} - ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EditForm;