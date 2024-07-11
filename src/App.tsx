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
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

// import AllPrice from "./services/DataPrice/allPrice";

function App() {
  return (
    <Provider store={store}>
      {/* <AllPrice /> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* <Route path="/product" element={<ProductDetails />} /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/page-not-found" />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
