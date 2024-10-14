import {
  BOOK_LIST_REQUEST, BOOK_LIST_SUCCESS, BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,  BOOK_DETAILS_SUCCESS,  BOOK_DETAILS_FAIL,
  BOOK_SAVE_REQUEST,  BOOK_SAVE_SUCCESS,  BOOK_SAVE_FAIL,
  BOOK_DELETE_SUCCESS,  BOOK_DELETE_FAIL,  BOOK_DELETE_REQUEST,
  BOOK_REVIEW_SAVE_REQUEST,  BOOK_REVIEW_SAVE_FAIL, BOOK_REVIEW_SAVE_SUCCESS,
} from '../constants/bookConstants';
import axios from 'axios';
import Axios from 'axios';

const listBooks = (
  category = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/books?category=' +
        category +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_LIST_FAIL, payload: error.message });
  }
};

const listBooks1 = (
  author = '',
  searchKeyword = '',
  sortOrder = ''
) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });
    const { data } = await axios.get(
      '/api/books?author=' +
        author +
        '&searchKeyword=' +
        searchKeyword +
        '&sortOrder=' +
        sortOrder
    );
    dispatch({ type: BOOK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_LIST_FAIL, payload: error.message });
  }
};

const saveBook = (book) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOK_SAVE_REQUEST, payload: book });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!book._id) {
      const { data } = await Axios.post('/api/books', book, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: BOOK_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put(
        '/api/books/' + book._id,
        book,
        {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        }
      );
      dispatch({ type: BOOK_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: BOOK_SAVE_FAIL, payload: error.message });
  }
};

const detailsBook = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST, payload: bookId });
    const { data } = await axios.get('/api/books/' + bookId);
    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: BOOK_DETAILS_FAIL, payload: error.message });
  }
};

const deleteBook = (bookId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: BOOK_DELETE_REQUEST, payload: bookId });
    const { data } = await axios.delete('/api/books/' + bookId, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });
    dispatch({ type: BOOK_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: BOOK_DELETE_FAIL, payload: error.message });
  }
};

const saveBookReview = (bookId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: BOOK_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/books/${bookId}/reviews`,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: BOOK_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: BOOK_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listBooks,
  listBooks1,
  detailsBook,
  saveBook,
  deleteBook,
  saveBookReview,
};
