
import './App.css';
import Header from './component/Header/Header';
import Product from './component/Product/Product';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Manage from './component/Manage/Manage';
import NotFound from './component/NotFound/NotFound';
import ProductDetail from './component/ProductDetail/ProductDetail';
import Login from './component/Login/Login';
import Shipment from './component/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoutes from './component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
const [loggedInUser, setLoggedInUser] = useState({});

  return (
   <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
<h3>Email : {loggedInUser.email}</h3>

      
    <BrowserRouter>
    <Header></Header>
    <Routes> 

    <Route path="/" element={<Shop />}>
    </Route>

    <Route path="/shop" element={<Shop />}>
        </Route>
    
        <Route path="/review" element={<Review />}>
        </Route>

        <Route element={<PrivateRoutes />}>
        <Route path="/manage" element={<Manage />} />
        </Route>

        {/* <Route path="/manage" element={<Manage />}>
        </Route> */}

        <Route path="/login" element={<Login />}>
        </Route>

        <Route element={<PrivateRoutes />}>
        <Route path="/shipment" element={<Shipment />} />
        </Route>

        {/* <Route path="/shipment" element={<Shipment />}>
        </Route> */}

        <Route path="/product/:productKey" element={<ProductDetail />}>
        </Route>

        <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter> 
    </UserContext.Provider>
  );
}

export default App;
