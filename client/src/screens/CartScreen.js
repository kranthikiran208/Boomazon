import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const bookId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (bookId) => {
    dispatch(removeFromCart(bookId));
  }
  useEffect(() => {
    if (bookId) {
      dispatch(addToCart(bookId, qty));
    }
  }, [dispatch,bookId,qty]);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  const getToWishlist = () =>{
    props.history.push("/wishlist/"+ bookId );
    removeFromCartHandler(bookId);
  }

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h2>
            Shopping Cart
          </h2>

          <div>
            <h3>Price</h3>
          </div>
        </li>
        {
          cartItems.length === 0 ?
            
                <div>
                <h3>Cart is empty</h3>
                {" "}
                <Link to='/wishlist/' className="button secondary text-center" >Add from Wishlist</Link> 
            </div>
            :
            cartItems.map(item =>
              <li key={1}>
                
                <div className="cart-image">
                  <img src={item.image} alt="book" />
                </div>
                <div className="cart-name">
                  <div>
                    <Link to={"/book/" + item.book}>
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.book, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    {' '}
                    <button type="button" className="button secondary" onClick={() => removeFromCartHandler(item.book)} >
                      Delete
                    </button>
                    {' '}{" "}
                    <button type="button" className="button secondary" onClick={() => getToWishlist(item.book)} >
                        Move to Wishlist
                      </button>

                  </div>
                </div>
                <div className="cart-price">
                  ₹ {Number(item.price) * Number(item.qty)}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cart-action">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)} items):
        ₹  {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;