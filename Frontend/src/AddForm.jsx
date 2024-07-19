import React, { useState, useEffect } from 'react';
import './Components/css/AddForm.css';

const AddForm = ({ onSubmit, onCancel, selectedQR }) => {
  const [name, setName] = useState('');
  const [urls, setUrls] = useState(['']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedQR) {
      setName(selectedQR.name);
      setUrls(selectedQR.urls || []);
    } else {
      setName('');
      setUrls(['']);
    }
  }, [selectedQR]);

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || urls.every(url => url.trim() === '')) {
      setError('Name and at least one URL are required.');
      return;
    }
    setError('');
    onSubmit({ name, urls });
  };

  return (
    <div className="add-form">
      <h2>{selectedQR ? 'Edit QR Code' : 'Add QR Code'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {urls.map((url, index) => (
          <div className="form-group" key={index}>
            <label>URL {index + 1}:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
            />
            {index === urls.length - 1 && (
              <button type="button" onClick={handleAddUrl}>Add Another URL</button>
            )}
          </div>
        ))}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
