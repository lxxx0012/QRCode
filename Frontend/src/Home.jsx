import React from 'react';
import { Link } from 'react-router-dom';
import './Components/css/Home.css';

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/reset-password">Reset Password</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>

      <h2>Welcome to Dynamic Multi-URLs QR Code</h2>
      <p>
        A QR code (Quick Response code) is a type of matrix barcode, or two-dimensional barcode, invented in 1994 by the 
        Japanese company Denso Wave. It consists of black squares arranged on a white background, which can be scanned and 
        read by a camera-equipped device, such as a smartphone.
      </p>
      <p>
        A dynamic multi-URL QR code is an advanced type of QR code that can redirect users to different URLs based on specific 
        conditions or interactions. Unlike static QR codes with fixed data, these QR codes offer flexibility and can be updated 
        even after creation. They can be programmed to change destinations based on factors such as the user's location, device 
        type, or time of day, making them ideal for personalized marketing and dynamic content delivery. This functionality 
        allows businesses to provide tailored user experiences and easily update content without generating new QR codes.
      </p>
      <p>
        Dynamic multi-URL QR codes can be programmed to:
      </p>
      <ul>
        <li>Redirect users to different URLs based on their location, device type, or time of day.</li>
        <li>Provide different content based on user preferences or behavior.</li>
        <li>Enable businesses to change the target URLs without generating a new QR code, allowing for easy updates and 
          adjustments.</li>
      </ul>
      <p>
        This functionality makes dynamic multi-URL QR codes ideal for personalized marketing, dynamic content delivery, and 
        enhanced user experiences.
      </p>
    </div>
  );
};

export default Home;
