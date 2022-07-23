import React, { useEffect, useState } from 'react';
import './Shop.css';

import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';



const Shop = () => {
    ///const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart,setCart] =useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=> setProducts(data))
    },[])
    
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
      
// if(products.length)
// {
//     const cartProducts = productKey.map(key=> {
//         const product = products.find(pd=> pd.id === key);
//         product.quantity = shoppingCart[key];
//         return product;
//     });
//       ///console.log(cartProducts);
//       setCart(cartProducts);
// }

    },[])

  const handleAddProduct = (product)=>{
      ///console.log("Product Added", product );
      const toBeAddedKey = product.id;
      const sameProduct = cart.find(pd=>pd.id===toBeAddedKey);
     let count =1;
     let newCart;
      if(sameProduct)
      {
          count = sameProduct.quantity + 1;
          sameProduct.quantity=count;
          const others = cart.filter(pd=>pd.id!==toBeAddedKey);
          newCart = [...others,sameProduct];
      }
      else{
          product.quantity=1;
          newCart = [...cart,product];
      }

      setCart(newCart);
      addToDb(product.id);
    //   const newCart = [...cart,product];
    //   setCart(newCart);
    //   addToDb(product.id);
  }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                
            <ul>{
                products.map(pd => <Product key={pd.id} showAddToCart={true} handleAddProduct ={handleAddProduct} Product={pd}></Product>)
            }
            </ul>

            </div>

            <div className='cart-container'>
                <Cart cart={cart}>
                <Link to='/review'>
                 <button className="main-button">Review Order</button>
             </Link>
                </Cart>
            </div>
            
            
        </div>
    );
};

export default Shop;