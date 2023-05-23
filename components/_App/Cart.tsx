import React from 'react';
import Link from '@/utils/ActiveLink';
import { useSelector } from 'react-redux';

const Cart = () => {
  //@ts-ignore
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <Link href='/checkout'>
      <a className='cart'>
        <i className='ri-shopping-cart-line'></i>
        <span>{cartItems.length}</span>
      </a>
    </Link>
  );
};

export default Cart;
