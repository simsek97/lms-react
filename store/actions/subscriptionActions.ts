import { ISubscriptionTier } from '@/data/subscription-tier';

export const updateSubscriptionsAction = (tiers: ISubscriptionTier[]) => ({ type: 'UPDATE_SUBSCRIPTIONS', data: tiers });

export const resetSubscriptionsAction = () => ({ type: 'RESET_SUBSCRIPTIONS' });
