import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '@/store/index';
import { IUser } from '@/data/user';
import { ISubscriptionTier } from '@/data/subscription-tier';

export interface IUserStore {
  profile: IUser;
}

interface IUserData extends IUser {}

const userInitialState: IUserStore = {
  profile: null
};

const userReducer = persistReducer(
  {
    storage,
    key: 'user'
  },
  (state: IUserStore = userInitialState, action: IAction<IUser & ISubscriptionTier>): IUserStore => {
    switch (action.type) {
      case 'UPDATE_USER':
        return {
          ...state,
          profile: action.data
        };

      case 'UPDATE_USER_SUBSCRIPTION':
        return {
          ...state,
          profile: { ...state.profile, subscription: action.data }
        };

      case 'RESET_USER':
        return {
          ...state,
          profile: null
        };

      default:
        return state;
    }
  }
);

export default userReducer;
