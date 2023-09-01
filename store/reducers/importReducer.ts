import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from 'store-old/index';
import { UserSubscription } from '@/src/API';

export interface IExtendedUserSubscription extends UserSubscription {
  phase?: string;
  error?: string;
}

export interface IImportSubscriptionData {
  id: number;
  EmailAddress: string;
  SubscriptionTitle: string;
  SubscriptionTerm: string;
  status: string;
}

export interface IImportStore {
  subscriptions: IExtendedUserSubscription[];
  importData: IImportSubscriptionData[];
  phase: string;
  error: string;
}

export interface IImportData extends IImportStore {}

const importInitialState: IImportStore = {
  subscriptions: [],
  importData: [],
  phase: null,
  error: null
};

const importReducer = persistReducer(
  {
    storage,
    key: 'import'
  },
  (state: IImportStore = importInitialState, action: IAction<Partial<IImportData>>): IImportStore => {
    switch (action.type) {
      case 'UPDATE_SUBSCRIPTIONS':
        const { subscriptions } = action.data;
        return {
          ...state,
          subscriptions
        };

      case 'RESET_SUBSCRIPTIONS':
        return {
          ...state,
          subscriptions: null
        };

      case 'UPDATE_IMPORT_DATA':
        const { importData } = action.data;
        return {
          ...state,
          importData
        };

      case 'RESET_IMPORT_DATA':
        return {
          ...state,
          importData: null
        };

      case 'UPDATE_IMPORT_PHASE':
        const { phase, error } = action.data;
        return {
          ...state,
          phase,
          error
        };

      default:
        return state;
    }
  }
);

export default importReducer;
