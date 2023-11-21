import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/PaymentPage.css';
import upiQrCodeImage from '../assets/images/GooglePay_QR.png';

const PaymentPage = () => {
    
    const { totalAmount } = useParams();

    return (
        <div className='text-center align-items-center'>
           
            <div className="qr-code-container">
                <h5>Scan this UPI and proceed your payment</h5>
                <img src={upiQrCodeImage} alt="UPI QR Code" />
                <p>Total Amount: ₹{totalAmount}</p>
            </div>
        </div>
    );
};

export default PaymentPage;
