import { Route, Routes, useLocation } from 'react-router-dom';
import Header, { HEADER_HEIGHT } from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import FooterInfo from './pages/FooterInfo.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AccountLayout from './pages/account/AccountLayout.jsx';
import AccountHome from './pages/account/AccountHome.jsx';
import AccountOrders from './pages/account/AccountOrders.jsx';
import AccountProfile from './pages/account/AccountProfile.jsx';
import AdminLayout from './pages/admin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminProfile from './pages/admin/AdminProfile.jsx';
import AdminPromotions from './pages/admin/AdminPromotions.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isDashboard = pathname.startsWith('/account') || pathname.startsWith('/admin');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isDashboard && <Header />}
      <main style={{ flex: 1, paddingTop: !isDashboard && !isHome ? HEADER_HEIGHT : 0 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/produits/:slug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/info/:topic" element={<FooterInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountHome />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="profile" element={<AccountProfile />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      {!isDashboard && <CookieBanner />}
    </div>
  );
}
