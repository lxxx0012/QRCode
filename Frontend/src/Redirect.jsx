import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function QRCodeRedirect() {
  const { qrCodeId } = useParams();

  useEffect(() => {
    const fetchQRCodeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/qrcodes/${qrCodeId}`);
        const data = await response.json();
        
        if (data.error) {
          console.error('Error:', data.error);
          return;
        }

        if (data.urls && data.urls.length > 0) {
          const firstUrl = data.urls[0];
          const lastUrl = data.urls[data.urls.length - 1];

          // Redirect to the first URL
          window.location.href = firstUrl;

          // Redirect to the last URL after a delay (e.g., 3 seconds)
          setTimeout(() => {
            console.log('Redirecting to:', lastUrl);
            window.location.href = lastUrl;
          }, 3000); // Delay in milliseconds
        } else {
          console.error('No URLs available for this QR code.');
        }
      } catch (error) {
        console.error('Error fetching QR code data:', error);
      }
    };

    fetchQRCodeData();
  }, [qrCodeId]);

  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}

export default QRCodeRedirect;
