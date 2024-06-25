import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/add-product" element={<ProductForm />} />
                    <Route path="/edit-product/:productId" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
