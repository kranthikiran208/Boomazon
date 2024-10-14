import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAIL,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAIL,
  BOOK_SAVE_REQUEST,
  BOOK_SAVE_SUCCESS,
  BOOK_SAVE_FAIL,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_REVIEW_SAVE_SUCCESS,
  BOOK_REVIEW_SAVE_REQUEST,
  BOOK_REVIEW_SAVE_FAIL,
  BOOK_REVIEW_SAVE_RESET,
} from '../constants/bookConstants';

function bookListReducer(state = { books: [] }, action) {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { loading: true, books: [] };
    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };
    case BOOK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookDetailsReducer(state = { book: { reviews: [] } }, action) {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { loading: true };
    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };
    case BOOK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookDeleteReducer(state = { book: {} }, action) {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };
    case BOOK_DELETE_SUCCESS:
      return { loading: false, book: action.payload, success: true };
    case BOOK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function bookSaveReducer(state = { book: {} }, action) {
  switch (action.type) {
    case BOOK_SAVE_REQUEST:
      return { loading: true };
    case BOOK_SAVE_SUCCESS:
      return { loading: false, success: true, book: action.payload };
    case BOOK_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function bookReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case BOOK_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case BOOK_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case BOOK_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case BOOK_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  bookListReducer,
  bookDetailsReducer,
  bookSaveReducer,
  bookDeleteReducer,
  bookReviewSaveReducer,
};
