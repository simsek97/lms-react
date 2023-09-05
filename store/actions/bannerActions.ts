import { IBanner } from '@/data/banner';

export const updateBannerAction = (banners: IBanner[]) => ({ type: 'UPDATE_BANNER', data: banners });

export const resetBannerAction = () => ({ type: 'RESET_BANNER' });
