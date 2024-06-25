import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7226/api/Products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`https://localhost:7226/api/Products/${productId}`);
                setProducts(products.filter(product => product.productId !== productId));
            } catch (error) {
                console.error('There was an error deleting the product!', error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Product List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>
                                <Link to={`/edit-product/${product.productId}`} className="btn btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(product.productId)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/add-product" className="btn btn-primary mt-4">Add Product</Link>
        </div>
    );
};

export default ProductList;
