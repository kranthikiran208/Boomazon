import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from "../constants/wishlistConstants";

function wishlistReducer(state = { wishlistItems: [] }, action) {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      const item = action.payload;
      const book = state.wishlistItems.find(x => x.book === item.book);
      if (book) {
        return {
            wishlistItems:
            state.wishlistItems.map(x => x.book === book.book ? item : x)
        };
      }
      return { wishlistItems: [...state.wishlistItems, item] };
    case WISHLIST_REMOVE_ITEM:
      return { wishlistItems: state.wishlistItems.filter(x => x.book !== action.payload) }
    default:
      return state
  }
}

export { wishlistReducer }