const initialState = {
    cartItems: []
  };
  
  export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.id === item.id);
  
        if (existItem) {
          // If the item already exists in the cart, update its quantity
          return {
            ...state,
            cartItems: state.cartItems.map((x) =>
              x.id === existItem.id ? item : x
            ),
          };
        } else {
          // Add new item to the cart
          return {
            ...state,
            cartItems: [...state.cartItems, item],
          };
        }
  
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
  
      case 'UPDATE_CART_QUANTITY':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
        };
        case 'CLEAR_CART':
            return {
              ...state,
              cartItems: [], // Reset cartItems to an empty array
            };
  
      default:
        return state;
    }
  };
  
