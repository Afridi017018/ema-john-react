import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css'

const Product = (props) => {

    const { img, name, stock, seller, price,id } = props.Product;
    ///console.log(props);
    
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />

            </div>
            <div>
                <h4 className='product-name'><Link to={"/product/"+id}>{name}</Link></h4>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p>Only {stock} left in stock - Order soon</p>
            {props.showAddToCart  && <button className='main-button' onClick={()=>props.handleAddProduct(props.Product)}>
            
                add cart
            </button>}
            </div>

        </div>
    );
};

export default Product;