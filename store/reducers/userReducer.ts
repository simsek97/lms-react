import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '../index';

export interface IUserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  owner: string;
  avatarUrl: string;
  avatarKey: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  occupation: string;
  institution: string;
  subscription: any;
  stripeCustomerId: string;
}

export interface IUserStore {
  profile: IUserProfile;
}

interface IUserData extends IUserProfile {}

const userInitialState: IUserStore = {
  profile: null
};

const userReducer = persistReducer(
  {
    storage,
    key: 'user'
  },
  (state: IUserStore = userInitialState, action: IAction<IUserProfile>): IUserStore => {
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
