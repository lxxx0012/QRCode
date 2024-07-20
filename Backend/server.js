const express = require('express');
const mongoose = require('mongoose');
const QRCode = require('./models/QRCode');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());

// Middleware for JSON body parsing
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://root:root@qrcode.hyinxbw.mongodb.net/?retryWrites=true&w=majority&appName=QRCode', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB is connected successfully'))
.catch((error) => console.error('Error in connecting to MongoDB:', error));

app.get('/qrcodes/:id', async (req, res) => {
  try {
    const qrCodeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(qrCodeId)) {
      return res.status(400).json({ error: 'Invalid QR Code ID' });
    }

    const qrCode = await QRCode.findById(qrCodeId);
    if (!qrCode) {
      return res.status(404).json({ error: 'QR Code not found.' });
    }

    const urls = qrCode.urls;
    if (urls.length === 0) {
      return res.status(404).json({ error: 'No URLs available for this QR code.' });
    }

    const lastUrl = urls[urls.length - 1];
    console.log('Last URL:', lastUrl);

    const qr = await QRCode.toDataURL(`https://qrcode-mebj.onrender.com/qrcodes/${qrCodeId}`);
    res.redirect(lastUrl);
  } catch (error) {
    console.error('Error fetching QR Code for redirection:', error);
    res.status(500).json({ error: 'Failed to fetch QR Code for redirection.' });
  }
});

app.post('/api/qrcodes', async (req, res) => {
  try {
    const { name, urls } = req.body;
    if (!name || typeof name !== 'string' || !Array.isArray(urls) || urls.some(url => typeof url !== 'string' || !url)) {
      return res.status(400).json({ error: 'Invalid data: name is required and urls must be a non-empty array of strings.' });
    }

    const newQRCode = new QRCode({ name, urls });
    await newQRCode.save();
    res.status(201).json(newQRCode);
  } catch (error) {
    console.error('Error creating QR Code:', error);
    res.status(500).json({ error: 'Failed to create QR Code.' });
  }
});

app.get('/api/qrcodes', async (req, res) => {
  try {
    const qrCodes = await QRCode.find();
    res.json(qrCodes);
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    res.status(500).json({ error: 'Failed to fetch QR codes.' });
  }
});

app.put('/api/qrcodes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, urls } = req.body;
    if (!name || typeof name !== 'string' || !Array.isArray(urls) || urls.some(url => typeof url !== 'string' || !url)) {
      return res.status(400).json({ error: 'Invalid data: name is required and urls must be a non-empty array of strings.' });
    }

    const updatedQR = await QRCode.findByIdAndUpdate(
      id,
      { name, urls },
      { new: true, runValidators: true }
    );
    if (!updatedQR) {
      return res.status(404).json({ error: 'QR Code not found.' });
    }
    res.json(updatedQR);
  } catch (error) {
    console.error('Error updating QR Code:', error);
    res.status(500).json({ error: 'Failed to update QR Code.' });
  }
});

app.delete('/api/qrcodes/:id', async (req, res) => {
  try {
    const deletedQRCode = await QRCode.findByIdAndDelete(req.params.id);
    if (!deletedQRCode) {
      return res.status(404).json({ error: 'QR Code not found.' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting QR Code:', error);
    res.status(500).json({ error: 'Failed to delete QR Code.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
