import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { ISubscriptionTier } from '@/data/subscription-tier';
import { IAction } from '@/store/index';

export interface ISubscriptionStore {
  subscriptions: ISubscriptionTier[];
}

interface ISubscriptionData extends ISubscriptionStore {}

const subscriptionInitialState: ISubscriptionStore = {
  subscriptions: []
};

const subscriptionReducer = persistReducer(
  {
    storage,
    key: 'banner'
  },
  (state: ISubscriptionStore = subscriptionInitialState, action: IAction<ISubscriptionTier[]>): ISubscriptionStore => {
    switch (action.type) {
      case 'UPDATE_SUBSCRIPTIONS':
        return {
          ...state,
          subscriptions: action.data
        };

      case 'RESET_SUBSCRIPTIONS':
        return {
          ...state,
          subscriptions: null
        };

      default:
        return state;
    }
  }
);

export default subscriptionReducer;
