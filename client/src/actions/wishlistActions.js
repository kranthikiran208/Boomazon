import Axios from "axios";
import Cookie from "js-cookie";
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../constants/wishlistConstants";

const addToWishlist = (bookId) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/books/" + bookId);
    dispatch({
      type: WISHLIST_ADD_ITEM, payload: {
        book: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock
      }
    });
    const { wishlist: { wishlistItems } } = getState();
    Cookie.set("wishlistItems", JSON.stringify(wishlistItems));

  } catch (error) {

  }
}
const removeFromWishlist = (bookId) => (dispatch, getState) => {
  dispatch({ type: WISHLIST_REMOVE_ITEM, payload: bookId });

  const { wishlist: { wishlistItems } } = getState();
  Cookie.set("wishlistItems", JSON.stringify(wishlistItems));
}
export { addToWishlist, removeFromWishlist }
