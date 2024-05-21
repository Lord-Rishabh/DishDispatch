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
    const url = `http://localhost:5173/menu/${user}/${tableNumber}`;
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
      const response = await fetch('http://localhost:3000/api/auth/userDetails', {
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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Generate QR Code
      </button>
      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeForm}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4">Enter Table Number</h2>
            <input
              type="text"
              placeholder="Enter Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border p-2 mb-4 w-full"
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={generateQRCode}
            >
              Generate QR Code
            </button>
            {qrCodeUrl && (
              <div className="text-center">
                <QRCode id="qrcode" value={qrCodeUrl} />
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
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
