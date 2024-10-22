// Action to add a product to the cart with a specified quantity
export const addToCart = (product, quantity) => (dispatch, getState) => {
  // Create a cart item by combining the product details and quantity
  const cartItem = {
    ...product,
    quantity,
  };

  // Dispatch an action to add the item to the cart in the store
  dispatch({
    type: 'ADD_TO_CART',
    payload: cartItem,
  });

  // Save the updated cart to localStorage to persist cart data across page reloads
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action to remove a product from the cart by its ID
export const removeFromCart = (id) => (dispatch, getState) => {
  // Dispatch an action to remove the item from the cart in the store
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });

  // Save the updated cart to localStorage to persist changes
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action to update the quantity of an item in the cart
export const updateCartQuantity = (id, quantity) => (dispatch, getState) => {
  // Dispatch an action to update the quantity of the specified item in the store
  dispatch({
    type: 'UPDATE_CART_QUANTITY',
    payload: { id, quantity },
  });

  // Save the updated cart to localStorage to persist the quantity changes
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action to clear the cart completely
export const clearCart = () => {
  // Dispatch an action to clear the cart in the store
  return {
    type: 'CLEAR_CART',
  };
};

  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };

  export const clearCart = () => {
    return {
      type: 'CLEAR_CART',
    };
  };
  
