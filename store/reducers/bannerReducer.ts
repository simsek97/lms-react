import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '../index';

export interface IBanner {
  id: string;
  bannerKey: string;
  bannerUrl?: string;
}

export interface IBannerStore {
  banners: IBanner[];
}

interface IBannerData extends IBannerStore {}

const bannerInitialState: IBannerStore = {
  banners: []
};

const bannerReducer = persistReducer(
  {
    storage,
    key: 'banner'
  },
  (state: IBannerStore = bannerInitialState, action: IAction<IBanner[]>): IBannerStore => {
    switch (action.type) {
      case 'UPDATE_BANNER':
        return {
          ...state,
          banners: action.data
        };

      case 'RESET_BANNER':
        return {
          ...state,
          banners: null
        };

      default:
        return state;
    }
  }
);

export default bannerReducer;
