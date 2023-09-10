import { IExtendedUserSubscription, IImportSubscriptionData } from '@/store/reducers/importReducer';

// Update subscriptions
export const updateSubscriptionsAction = (subscriptions: IExtendedUserSubscription[]) => ({
  type: 'UPDATE_SUBSCRIPTIONS',
  data: { subscriptions }
});

// Add subscriptions
export const addSubscriptionAction = (importData: IImportSubscriptionData[]) => ({
  type: 'ADD_SUBSCRIPTION',
  data: { importData }
});

// Reset subscriptions
export const resetSubscriptionsAction = () => ({ type: 'RESET_SUBSCRIPTIONS' });

// Update import data
export const updateImportDataAction = (importData: IImportSubscriptionData[]) => ({
  type: 'UPDATE_IMPORT_DATA',
  data: { importData }
});

// Reset import data
export const resetImportDataAction = () => ({ type: 'RESET_IMPORT_DATA' });

// Update phase
export const updateImportPhaseAction = (phase: string, error: string) => ({ type: 'UPDATE_IMPORT_PHASE', data: { phase, error } });
