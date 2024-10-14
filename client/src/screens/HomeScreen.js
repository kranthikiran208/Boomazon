import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listBooks, listBooks1 } from '../actions/bookActions';
import Rating from '../components/Rating';

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const author = props.match.params.id ? props.match.params.id : '';
  const bookList = useSelector((state) => state.bookList);
  const { books, loading, error } = bookList;

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(listBooks(category));
    return () => {
      //
    };
  }, [category,dispatch]);

  useEffect(() =>{
    dispatch(listBooks1(author));
    return() => {
      //
    };
  },[author,dispatch])


  

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listBooks(category, searchKeyword));
    dispatch(listBooks1(author, searchKeyword));
  };

  return (
    <>
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder ="Search by Book Title"
            />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit">Search</button>
          </form>
        </li>
      </ul>
      {category && <h2 className="text-center">{category}</h2>}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (<div>
        {!category && (!author && <h2 className="text-center">Popular Books</h2>)}
        <ul className="books">
          {books.map((book) => (
            <li key={book._id}>
              <div className="book">
                <Link to={'/book/' + book._id}>
                  <img
                    className="book-image"
                    src={book.image}
                    alt={book.name}
                  />
                </Link>
                <div className="book-name">
                  <Link to={'/book/' + book._id}>{book.name}</Link>
                </div>
                <div className="book-author">{book.author}</div>
                <div className="book-price">₹ {book.price}</div>
                <div className="book-rating">
                  <Rating
                    value={book.rating}
                    text={book.numReviews + ' reviews'}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      )}
    </>
  );
}
export default HomeScreen;
