import React from 'react';
// import fakeData from '../../fakeData/products.json';

const Manage = () => {

    const handleAddProduct =()=>{
        
        const product = {};

        fetch("http://localhost:5000/addProduct",{
            method:'POST',

            headers:{
                'Content-Type' : 'application/json'
            },

            body: JSON.stringify(product)

        })
    }

    return (
        <div>
            <h1>Manage Inventory Coming Soon!!!</h1>
            <form action="">
                <p><span>Name :</span><input type="text" /></p>
                <p><span>Price :</span><input type="text" /></p>
                <p><span>Quantity :</span><input type="text" /></p>
                <p><span>Product Image :</span><input type="file" /></p>
            <button onClick={handleAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Manage;