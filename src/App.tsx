import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Header from "../src/components/Header/header";
import Footer from "../src/components/Footer/footer";
import Body from "../src/components/Body/body";
import ProductDetails from "../src/components/ProductDetails/productDetails";
import Cart from "../src/components/Cart/cart";
import PageNotFound from "../src/components/404/PageNotFound";
//import { useAppDispatch, useAppSelector } from './hooks';
//import { toggleCart } from './store/cartSlice';

function App() {
  //const dispatch = useAppDispatch();
  //const user = useAppSelector((state) => state.user.user);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/page-not-found" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
