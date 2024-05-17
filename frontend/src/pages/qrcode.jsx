import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = () => {
    const [url, setUrl] = useState('');
    const [qrCodeUrl, setQRCodeUrl] = useState('');

    const generateQRCode = () => {
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

    return (
        <div className='p-12'>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={generateQRCode}>Generate QR Code</button>
            {qrCodeUrl && (
                <div>
                    <QRCode id="qrcode" value={qrCodeUrl} />
                    <button onClick={downloadQRCode}>Download QR Code</button>
                </div>
            )}
        </div>
    );
};

export default QRCodeGenerator;
