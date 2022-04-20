import React from 'react';



const Cart = (props) => {
  
    const cart = props.cart;
    //const total =cart.reduce((total,prd)=> total+prd.price,0); /// this is called reduce system;
let total=0;

for(let i=0;i<cart.length;i++)
{
    let product = cart[i];
    total += product.price* product.quantity;

    ///debugger;
}

let shipping = 0;

if(total>1200)
shipping=0;
else if(total>480)
  shipping=9.99;

else if(total > 0)
    shipping = 15.50;

    const tax = (total/10).toFixed(2);
    const grandTotal = (total+shipping+ Number(tax)).toFixed(2);  // we used "Number" syntax becz when "to fixed" has been used in the previous line it made the tax into string.

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length} </p>
            <p><small>Shipping Cost: {shipping}</small></p>
            <p><small>Tax + vat: {tax}</small></p>
            <p>Total Price: {grandTotal}</p>
            <br />
            {
                props.children
            }
        </div>
    );
};

export default Cart;