import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { deleteShoppingCart } from '../../utilities/fakedb';
import './Shipment.css'

const Shipment = () => {
    const [loggedIn,setLoggedIn] = useContext(UserContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data =>{
    ///console.log(data);
    ///
    let shoppingCart = {};
        const storedCart = localStorage.getItem('shopping-cart');
        if(storedCart){
            shoppingCart = JSON.parse(storedCart);
        }
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
        ///
  const orderDetails = {...loggedIn,products: shoppingCart,shipment: data, orderTime: new Date() }


  fetch('http://localhost:5000/addOrder',{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
    },
    body: JSON.stringify(orderDetails)
})
.then(res=> res.json())
.then(data=> {
 /// console.log(data);
  ///if(data){
    deleteShoppingCart();
  alert('your order placed successfully');
 /// console.log("hi");
 // }
})

  } 

  ///console.log(watch("example")); // watch input value by passing the name of it

  return (
    
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
     

      <input {...register("name", { required: true })} defaultValue={loggedIn.name} placeholder="Your Name" />
      {errors.name && <span className='error'>Name is required</span>}

      <input {...register("email", { required: true })} defaultValue={loggedIn.email} placeholder="Your Email" />
      {errors.email && <span className='error'>Email is required</span>}

      <input {...register("address", { required: true })} placeholder="Your Address" />
      {errors.address && <span className='error'>Address is required</span>}

      <input {...register("phone", { required: true })} placeholder="Your Phone Number" />
      {errors.phone && <span className='error'>Phone number is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;