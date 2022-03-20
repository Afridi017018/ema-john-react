import React from 'react';
import './Product.css'

const Product = (props) => {

    const { img, name, stock, seller, price } = props.Product;
    //console.log(props.Product);
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />

            </div>
            <div>
                <h4 className='product-name'>{name}</h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p>Only {stock} left in stock - Order soon</p>
                <button className='main-button' onClick={()=>props.handleAddProduct(props.Product)}>
                
                    add cart
                </button>
            </div>

        </div>
    );
};

export default Product;