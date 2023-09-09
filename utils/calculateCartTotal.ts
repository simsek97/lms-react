export const calculateCartTotal = (cartItems, term = 'monthly') => {
  const total = cartItems.reduce((acc, el) => {
    acc += term === 'yearly' ? el.price * 12 : el.price;
    return acc;
  }, 0);

  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
};
