import { IBanner } from '../reducers/bannerReducer';

// Update user
export const updateBannerAction = (banners: IBanner[]) => ({ type: 'UPDATE_BANNER', data: banners });

// Reset user
export const resetBannerAction = () => ({ type: 'RESET_BANNER' });
