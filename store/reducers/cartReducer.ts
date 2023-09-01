import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '../index';

export interface ICartStore {
  cartItems: any;
  discount: number;
}

interface ICartData extends ICartStore {}

const cartInitialState: ICartStore = {
  cartItems: [],
  discount: 0.0
};

const cartReducer = persistReducer(
  {
    storage,
    key: 'cart'
  },
  (state: ICartStore = cartInitialState, action: IAction<ICartData>): ICartStore => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [action.data]
        };

      case 'REMOVE_CART':
        return {
          ...state,
          cartItems: []
        };

      case 'RESET_CART':
        return {
          ...state,
          cartItems: []
        };

      default:
        return state;
    }
  }
);

export default cartReducer;
