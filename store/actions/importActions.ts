import { IExtendedUserSubscription, IImportSubscriptionData } from '@/store/reducers/importReducer';

export const updateSubscriptionsAction = (subscriptions: IExtendedUserSubscription[]) => ({
  type: 'UPDATE_SUBSCRIPTIONS',
  data: { subscriptions }
});

export const addSubscriptionAction = (importData: IImportSubscriptionData[]) => ({
  type: 'ADD_SUBSCRIPTION',
  data: { importData }
});

export const resetSubscriptionsAction = () => ({ type: 'RESET_SUBSCRIPTIONS' });

export const updateImportDataAction = (importData: IImportSubscriptionData[]) => ({
  type: 'UPDATE_IMPORT_DATA',
  data: { importData }
});

export const resetImportDataAction = () => ({ type: 'RESET_IMPORT_DATA' });

export const updateImportPhaseAction = (phase: string, error: string) => ({ type: 'UPDATE_IMPORT_PHASE', data: { phase, error } });
