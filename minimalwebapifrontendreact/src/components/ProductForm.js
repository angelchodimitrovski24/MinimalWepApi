import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm = () => {
    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { productId: paramProductId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (paramProductId) {
            axios.get(`https://localhost:7226/api/Products/${paramProductId}`)
                .then(response => {
                    setProductId(response.data.productId); // Assuming response.data.productId matches your backend property name
                    setName(response.data.name);
                    setPrice(response.data.price.toString());
                })
                .catch(error => console.error(error));
        }
    }, [paramProductId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate price input
        if (isNaN(parseFloat(price))) {
            console.error('Price must be a valid number');
            return; // Prevent further execution if price is not valid
        }

        const product = {
            ProductId: productId,
            Name: name,
            Price: parseFloat(price).toFixed(2)  // Ensure price is formatted to two decimal places
        };

        try {
            // Determine whether to use POST or PUT based on paramProductId existence
            const response = paramProductId
                ? await axios.put(`https://localhost:7226/api/Products/${paramProductId}`, product)
                : await axios.post('https://localhost:7226/api/Products', product);

            // Handle response, e.g., navigate to a different page
            navigate('/');
        } catch (error) {
            console.error('Error saving product:', error);
            // Handle specific errors, log them, or show user-friendly messages
        }
    };

    return (
        <div className="container mt-4">
            <h2>{paramProductId ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                {paramProductId && (
                    <div className="mb-3">
                        <label className="form-label">Product ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productId}
                            readOnly
                        />
                    </div>
                )}
                {!paramProductId && (
                    <div className="mb-3">
                        <label className="form-label">Product ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
};

export default ProductForm;