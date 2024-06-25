import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [productId, setProductId] = useState('');
    const [paymentId, setPaymentId] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const product = {
            ProductId: productId,
            Name: name,
            Price: parseFloat(price)  // Ensure price is parsed as a float
        };
    
        try {
            const response = await axios.post('https://localhost:7226/api/Products', product, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Product saved successfully:', response.data);
            navigate('/');  // Navigate to home or another page on successful save
        } catch (error) {
            console.error('Error saving product:', error);
            if (error.response) {
                console.error('Server error details:', error.response.data);
            }
            // Handle specific errors, log them, or show user-friendly messages
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Process Transaction</h2>
            <div>
                <label>Product ID</label>
                <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
            </div>
            <div>
                <label>Payment ID</label>
                <input type="text" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} required />
            </div>
            <div>
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div>
                <label>Currency</label>
                <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
            </div>
            <div>
                <label>Transaction ID</label>
                <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />
            </div>
            <div>
                <label>Status</label>
                <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionForm;
