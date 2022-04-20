
import './App.css';
import Header from './component/Header/Header';
import Product from './component/Product/Product';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from './component/Shop/Shop';
import Review from './component/Review/Review';
import Manage from './component/Manage/Manage';
import NotFound from './component/NotFound/NotFound';
import ProductDetail from './component/ProductDetail/ProductDetail';


function App() {
  return (
    <div >
      <Header></Header>
    <BrowserRouter>
    <Routes> 

    <Route path="/" element={<Shop />}>
    </Route>

    <Route path="/shop" element={<Shop />}>
        </Route>
    
        <Route path="/review" element={<Review />}>
        </Route>

        <Route path="/manage" element={<Manage />}>
        </Route>

        <Route path="/product/:productKey" element={<ProductDetail />}>
        </Route>

        <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;
