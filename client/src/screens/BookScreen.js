import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsBook, saveBookReview } from '../actions/bookActions';
import Rating from '../components/Rating';
import { BOOK_REVIEW_SAVE_RESET } from '../constants/bookConstants';

function BookScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const bookDetails = useSelector((state) => state.bookDetails);
  const { book, loading, error } = bookDetails;

  const bookReviewSave = useSelector((state) => state.bookReviewSave);
  const { success: bookSaveSuccess } = bookReviewSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: BOOK_REVIEW_SAVE_RESET });
    }
    dispatch(detailsBook(props.match.params.id));
    return () => {
      //
    };
  }, [bookSaveSuccess,dispatch,props.match.params]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveBookReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  
  const handleAddToCart = () => {
    props.history.push('/cart/' + props.match.params.id + '?qty=' + qty);
  };

  const handleAddToWishlist = () =>{
    props.history.push("/wishlist/"+props.match.params.id)
  }

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">&#60; Back to result</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={book.image} alt="book"></img>
            </div>
            <div className="details-info">
              <ul>
              <li className="name">
                        <Link to={'/book/'+book._id}><h4>{book.name}</h4></Link>
                        by <Link to="/">{book.author}</Link> (author)
                    </li>
                <li>
                  <a href="#reviews">
                    <Rating
                      value={book.rating}
                      text={book.numReviews + ' reviews'}
                    />
                  </a>
                </li>
                <li>
                  Price: <b> ₹ {book.price}</b>
                </li>
                <li>
                  Description:
                  <div>{book.description}</div>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li><b>Price: ₹ {book.price}</b></li>
                <li>
                  <b>
                  Status:{' '}
                  {book.countInStock > 0 ? 'In Stock' : 'Unavailable.'}
                  </b>
                </li>
                <li>
                  <b>Qty:</b>{' '}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  >
                    {[...Array(book.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                <button className="button secondary" onClick={handleAddToWishlist}>Add to Wishlist</button>
                  {' '}
                  {book.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary"
                    >
                      Add to Cart
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!book.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {book.reviews.map((review) => (
                <li key={review._id}>
                  <div><b>Customer Name: </b>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div><b>Date: </b>{review.createdAt.substring(0, 10)}</div>
                  <div><b>Comment: </b>{review.comment}</div>
                </li>
              ))}
              </ul>
              <>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </>
          </div>
        </>
      )}
    </div>
  );
}
export default BookScreen;
