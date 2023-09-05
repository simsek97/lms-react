import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IBanner } from '@/data/banner';
import { IAction } from '@/store/index';

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
