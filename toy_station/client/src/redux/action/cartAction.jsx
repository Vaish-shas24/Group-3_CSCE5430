

export const addToCart = (product, quantity) => (dispatch, getState) => {
  const cartItem = {
    ...product,
    quantity,
  };

  dispatch({
    type: 'ADD_TO_CART',
    payload: cartItem,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const updateCartQuantity = (id, quantity) => (dispatch, getState) => {
  console.log("quantity", quantity)
  dispatch({
    type: 'UPDATE_CART_QUANTITY',
    payload: { id, quantity },
  });
  const cartItems = getState().cart.cartItems;
  console.log("Data",JSON.stringify(getState().cart.cartItems))
  const quantities = cartItems.map(item => ({
    productId: item._id,
    quantity: item.quantity
  }));
  console.log("quantities", quantities)
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
