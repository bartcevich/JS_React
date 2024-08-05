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
import LoginData from "./components/LoginBlock/loginData";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="mainContainer">
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/page-not-found" element={<PageNotFound />} />
            <Route path="*" element={<Navigate to="/page-not-found" />} />
            <Route path="/login" element={<LoginData />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
