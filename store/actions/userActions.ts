import { IUser } from '@/data/user';

// Update user
export const updateUserAction = (user: any) => ({ type: 'UPDATE_USER', data: user });

// Update user subscription
export const updateUserSubscriptionAction = (subscription: any) => ({ type: 'UPDATE_USER_SUBSCRIPTION', data: subscription });

// Reset user
export const resetUserAction = () => ({ type: 'RESET_USER' });
