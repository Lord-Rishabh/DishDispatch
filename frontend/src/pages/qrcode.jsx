import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const QRCodeGenerator = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [qrCodeUrl, setQRCodeUrl] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const generateQRCode = () => {
    const url = `https://dish-dispatch.vercel.app/menu/${user}/${tableNumber}`;
    setQRCodeUrl(url);
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById('qrcode');
    const qrCodeUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClick = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
    setTableNumber('');
    setQRCodeUrl('');
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch(`${import.meta.env.VITE_serverUrl}/api/auth/userDetails`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
      const json = await response.json();
      setUser(json.username);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <button
        className="bg-gray-800 hover:scale-105 ease-in-out rounded-lg text-white text-lg font-semibold py-2 px-4 mb-4 mr-4"
        onClick={handleClick}
      >
        Generate QR Code
      </button>
      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-xl relative max-w-md w-full">
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-md flex items-center justify-center hover:bg-red-700 transition duration-200 ease-in-out"
            onClick={closeForm}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Enter Table Number</h2>
          <input
            type="text"
            placeholder="Enter Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            className="border p-2 mb-4 w-full rounded-md outline-none focus:border-blue-500 transition duration-200 ease-in-out"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4 transition duration-200 ease-in-out"
            onClick={generateQRCode}
          >
            Generate QR Code
          </button>
          {qrCodeUrl && (
            <div className="text-center">
              <QRCode id="qrcode" value={qrCodeUrl} />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 transition duration-200 ease-in-out"
                onClick={downloadQRCode}
              >
                Download QR Code
              </button>
            </div>
          )}
        </div>
      </div>
  
      )}
    </>
  );
};

export default QRCodeGenerator;
