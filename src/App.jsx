import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import About from "./pages/About";
import Sourcing from "./pages/Sourcing";
import BulkOrders from "./pages/BulkOrders";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Faq from "./pages/Faq";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import { Privacy, Terms } from "./pages/Legal";
import NotFound from "./pages/NotFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="grid min-h-screen place-items-center bg-cream px-6 text-center">
          <div>
            <p className="font-display text-5xl text-forest">Something broke on this page.</p>
            <p className="mt-3 text-sm text-ink/70">Reload to return to the catalogue. Your cart is still saved in this browser.</p>
            <button type="button" className="mt-6 h-12 rounded-full bg-forest px-6 text-sm font-semibold text-cream" onClick={() => window.location.assign("/")}>
              Reload DHANYA
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="rice" element={<Shop preset="rice" />} />
          <Route path="wheat" element={<Shop preset="wheat" />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="sourcing" element={<Sourcing />} />
          <Route path="bulk" element={<BulkOrders />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="faq" element={<Faq />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="account" element={<Account />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
