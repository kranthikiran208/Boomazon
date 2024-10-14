import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import CartScreen from './screens/CartScreen';
import WishlistScreen from './screens/WishlistScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import BooksScreen from './screens/BooksScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import { logout } from './actions/userActions';


function App() {


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  }

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <img className="brand-logo" src={require('./favicon.jpg')} alt="Boomazon"/>
            
            <Link to="/">Boomazon</Link>
          </div>
          <div className="header-links">
            {userInfo &&(!userInfo.isAdmin && <Link to="/cart">Cart</Link>)}
            {userInfo &&(!userInfo.isAdmin && <Link to="/wishlist">Wishlist</Link>)}
            {userInfo ? (
              <Link to="/profile">Hello, {userInfo.nickname}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="/">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/books">Books</Link>
                  </li>
                </ul>
              </div>
            )}
           {userInfo && <Link onClick={handleLogout}>Logout</Link> }
          </div>
        </header>
        <aside className="sidebar">
          <button className="sidebar-close-button" onClick={closeMenu}>
            <i className="fas fa-times"></i>
          </button>
          <div>
          <h3>Book Categories</h3>
          
          <ul className="categories">
            <li>
              <Link to="/category/Full Stack Developer" >Full Stack Developer</Link>
            </li>

            <li>
              <Link to="/category/ReactJS">React JS</Link>
            </li>
            <li>
              <Link to="/category/NodeJS">NodeJS</Link>
            </li>
            <li>
              <Link to="/category/JS">Modern JS</Link>
            </li>
            <li>
              <Link to="/category/HTML,CSS and RWD">HTML,CSS and RWD</Link>
            </li>
            <li>
              <Link to="/category/MongoDB">Mongo DB</Link>
            </li>
          </ul>
          
          </div>
          <div>
          <h3>Book Authors</h3>
          <ul className="authors">
            <li>
              <Link to="/author/Chris Northwood">Chris Northwood</Link>
            </li>

            <li>
              <Link to="/author/Vasan Subramanian">Vasan Subramanian</Link>
            </li>
            <li>
              <Link to="/author/Robin Wieruch">Robin Wieruch</Link>
            </li>
            <li>
              <Link to="/author/Susan Fitzgerald">Susan Fitzgerald</Link>
            </li>
            <li>
              <Link to="/author/Sandro Pasquali">Sandro Pasquali</Link>
            </li>
            <li>
              <Link to="/author/Alex Young">Alex Young</Link>
            </li>
            <li>
              <Link to="/author/Laura Lemay">Laura Lemay</Link>
            </li>
            <li>
              <Link to="/author/Eoin Brazil">Eoin Brazil</Link>
            </li>
            <li>
              <Link to="/author/Hirako San">Hirako San</Link>
            </li>
            <li>
              <Link to="/author/Eddy Wilson Iriarte Koroliova">Eddy Wilson Iriarte Koroliova</Link>
            </li>
            </ul>
          </div>
          
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/books" component={BooksScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/book/:id" component={BookScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/wishlist/:id?" component={WishlistScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/author/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          
          </div>
        </main>
        <footer className="footer">
        <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Join the Club newsletter to receive our best reader deals
        </p>
        <p className='footer-subscription-text'>
          You can unsubscribe at any time.
        </p>
        <div className='input-areas'>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <button className='button secondary'>Subscribe</button>
          </form>
        </div>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/signup'>How it works</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/contact'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
          
            <Link to='/' className='social-logo' >
              <img className="brand-logo" src={require('./favicon.jpg')} alt="Boomazon"/><h3>Boomazon</h3>
            </Link>
          </div>
          </div>
          
        
        
        
      </section>
      <div>
      <p className='website-rights text-center muted'>Boomazon © 2020</p>
        </div>
      </div>
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
