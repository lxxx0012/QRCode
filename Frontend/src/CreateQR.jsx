import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Components/css/CreateQR.css';

const CreateQR = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ name: '', url: '' });

  // Handle form submission
  const handleCreateQR = async () => {
    if (!name || !url) {
      setErrors({
        name: !name ? 'Name is required' : '',
        url: !url ? 'URL is required' : ''
      });
      return;
    }

    try {
      setIsLoading(true);

      // Prepare data for the API request
      const newQR = { name, urls: [url] };

      // Encode URLs as JSON array
      const encodedData = encodeURIComponent(JSON.stringify(newQR.urls));
      const qrCodeUrl = `http://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=60x60`;

      console.log('QR Code URL:', qrCodeUrl);

      // Make API request to save QR Code
      const response = await axios.post('http://localhost:5000/api/qrcodes', newQR);
      console.log('Response:', response.data);

      // Navigate to the dashboard after successful creation
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving QR Code:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        alert(`Failed to save QR Code: ${error.response.data.error}`);
      } else {
        alert('Failed to save QR Code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setName('');
    setUrl('');
    navigate('/dashboard');
  };

  return (
    <div className="create-qr-container">
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/create" end className={({ isActive }) => isActive ? 'active-link' : ''}>New QR</NavLink>
          </li>
        </ul>
      </nav>

      <h2>Create New QR Code</h2>
      <div className="create-qr-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="url" className="form-label">URL</label>
          <input
            type="text"
            className="form-control"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          {errors.url && <div className="error">{errors.url}</div>}
        </div>
        <div className="button-group">
          <button type="button" className="btn btn-primary" onClick={handleCreateQR} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQR;
