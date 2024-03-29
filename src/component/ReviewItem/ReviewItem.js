import React from 'react';

const ReviewItem = (props) => {
    ///console.log(props);
    const {name,quantity,id,price} = props.product;

    const reviewItemStyle = {
        borderBottom:'1px solid lightgray',
        marginBottom: '5px',
        paddingBottom:'5px'
    };
    return (
        <div style={reviewItemStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button className='main-button' onClick={()=>props.removeProduct(id)}>Remove</button>
        </div>
    );
};

export default ReviewItem;