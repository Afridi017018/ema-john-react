import React, { useEffect, useState } from 'react';

import fakeData from '../../fakeData/products.json';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router';

const Review = () => {
    const[cart,setCart]=useState([])
    const [orderPlaced,setOrderPlaced] = useState(false);
    const history = useNavigate();

    const handleProceedCheckout =()=>{

        history("/shipment");
        // setCart([]);
        // setOrderPlaced(true);
        // deleteShoppingCart();
    }

    const removeProduct = (productKey)=>{
        ///console.log("clicked",productKey);
        const newCart = cart.filter(pd=> pd.id!==productKey)
        setCart(newCart);
        removeFromDb(productKey);
    }

    useEffect(()=>{
        //cart
        let shoppingCart = {};
        const storedCart = localStorage.getItem('shopping-cart');
        if(storedCart){
            shoppingCart = JSON.parse(storedCart);
        }
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));

        const productKey = Object.keys(shoppingCart);
      ///const count = productKey.map(key=> shoppingCart[key]);

fetch('http://localhost:5000/productByIds',{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(productKey)
})
.then(res=> res.json())
.then(data=> setCart(data))

    //   const cartProducts = productKey.map(key=> {
    //       const product = fakeData.find(pd=> pd.id === key);
    //       product.quantity = shoppingCart[key];
    //       return product;
    //   });

    //    ///console.log(cartProducts);
    //    setCart(cartProducts);
    },[]);

let thankyou;
if(orderPlaced)
{
    thankyou = <img src={happyImage} alt="" />
}
   

    return (
        <div className='shop-container'>
        
        <div className='product-container'>
        {
            cart.map(pd=> <ReviewItem removeProduct={removeProduct} key={pd.id} product={pd}></ReviewItem>)
        }

        {
           thankyou
        }
        </div>

        <div className="cart-container">
            <Cart cart={cart}>
                <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
            </Cart>
        </div>
        
        </div>
    );
};

export default Review;