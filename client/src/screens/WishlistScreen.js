import React, { useEffect } from 'react';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function WishlistScreen(props) {

    const wishlist = useSelector(state => state.wishlist);
    const cart = useSelector(state => state.cart);
    const { wishlistItems } = wishlist;
    const { cartItems } = cart;
    const bookId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromWishlistHandler = (bookId) => {
      dispatch(removeFromWishlist(bookId));
    }
    useEffect(() => {
      if (bookId) {
        dispatch(addToWishlist(bookId, qty));
      }
    }, [dispatch,bookId,qty]);
    
    const handleAddToCart = () =>{
      props.history.push("/cart/"+ bookId);
      removeFromWishlistHandler(bookId);
  }
    
      return <div classtitle="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h2>
              Shopping Wishlist
            </h2>
            <div>
              <h3>Price</h3>
            </div>
          </li>
          {
            wishlistItems.length === 0 ?
              <div>
                <b>Wishlist is empty</b>
            </div>
              :
              wishlistItems.map(item =>
                <li>
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
                      <button type="button" className="button red" onClick={() => removeFromWishlistHandler(item.book)} >
                        Delete
                      </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {item.countInStock>0 && <button className="button secondary cart-button" onClick={handleAddToCart}>Add to Cart</button>}
                    </div>
                  </div>
                  <div className="cart-price">
                    ₹ {item.price}
                  </div>
                </li>
              )
          }
        </ul>
  
      </div>
      <div className=" text-center action">
        
        <Link to="/cart/?" className="button secondary " >{cartItems.length !==0 ? "Go to Cart":<Link to="/">Add some books</Link>}</Link>
  
      </div>
  
    </div>
  }




export default WishlistScreen;