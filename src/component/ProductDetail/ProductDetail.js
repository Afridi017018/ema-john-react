import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product,setProduct] = useState({});

useEffect(()=>{
    fetch('http://localhost:5000/product/'+ productKey)
    .then(res=> res.json())
    .then(data=> setProduct(data))
},[productKey])

    ///console.log(productKey);
    ///const product = fakeData.find(pd=> pd.id === productKey)
    ///console.log(product);

    return (
        <div>
            <h1>Your Product Details of ID {productKey} !!!</h1>
           <Product showAddToCart={false} Product={product}></Product>
        </div>
    );
};

export default ProductDetail;