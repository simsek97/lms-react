import { GraphQLQuery } from '@aws-amplify/api';
import { API, graphqlOperation } from 'aws-amplify';
import { put } from 'redux-saga/effects';

import { SubscriptionTier, User, UserByEmailQuery } from '@/src/API';
import { userByEmail } from '@/src/graphql/queries';
import { IAction } from 'store-old/index';
import { IImportData, IImportSubscriptionData } from '@/store/reducers/importReducer';
import getTiers from '@/utils/getTiers';
import updateUserById from '@/utils/updateUserById';

export function* sagaAddSubscription({ data }: IAction<Partial<IImportData>>) {
  // Update phase
  yield updateImportPhase('adding', null);

  const { importData } = data;

  console.log('import data', importData);

  const plans: SubscriptionTier[] = yield getTiers(20);
  console.log('all tiers', plans);

  try {
    for (let i = 0; i < importData.length; i++) {
      // Update import data
      importData[i].status = 'Started...';
      yield updateImportData(importData);

      const importedRow = importData[i];

      const { data: userByEmailData } = yield API.graphql<GraphQLQuery<UserByEmailQuery>>(
        graphqlOperation(userByEmail, { email: importedRow.EmailAddress })
      );

      const userInfo: User = userByEmailData.userByEmail?.items?.length > 0 ? userByEmailData.userByEmail?.items[0] : null;

      if (!userInfo) {
        // Update import data
        importData[i].status = 'User does not exist!';
        yield updateImportData(importData);
      } else if (userInfo?.stripeCustomerId) {
        // Update import data
        importData[i].status = 'User manages their subscription!';
        yield updateImportData(importData);
      } else if (userInfo?.subscription) {
        // Update import data
        importData[i].status = 'User has a subscription already!';
        yield updateImportData(importData);
      } else {
        const filteredPlan = plans.find(
          (p: SubscriptionTier) => p?.title?.toLowerCase() === importedRow?.SubscriptionTitle?.toLowerCase()
        );

        if (!filteredPlan) {
          // Update import data
          importData[i].status = 'Subscription is not valid!';
          yield updateImportData(importData);
        } else {
          importData[i].status = 'Creating subscription...';
          yield updateImportData(importData);

          const subscribedAt = new Date();
          const newSubscription = {
            tier: filteredPlan.tier,
            title: filteredPlan.title,
            price: filteredPlan.price,
            subscribedAt: subscribedAt.toDateString()
          };
          if (importedRow.SubscriptionTerm === 'yearly') {
            newSubscription['yearlyPriceId'] = filteredPlan.yearlyPriceId;
            newSubscription['expiresAt'] = new Date(subscribedAt.setFullYear(subscribedAt.getFullYear() + 1));
          } else {
            newSubscription['montlyPriceId'] = filteredPlan.montlyPriceId;
            newSubscription['expiresAt'] = new Date(subscribedAt.setMonth(subscribedAt.getMonth() + 1));
          }

          // Update user subscription
          // Update import data
          importData[i].status = 'Adding subscription to user!';
          yield updateImportData(importData);

          yield updateUserById({
            id: userInfo.id,
            subscription: newSubscription
          });

          // Update import data
          importData[i].status = 'Subscription added!';
          yield updateImportData(importData);
        }
      }
    }

    // Update phase
    yield updateImportPhase('success', null);
  } catch (error) {
    console.log(error);
    // Update phase
    yield updateImportPhase('error', error);
  }
}

function* updateImportPhase(phase: string, error?: string) {
  yield put({
    type: 'UPDATE_IMPORT_PHASE',
    data: { phase, error }
  });
}

function* updateImportData(importData: IImportSubscriptionData[]) {
  yield put({
    type: 'UPDATE_IMPORT_DATA',
    data: { importData }
  });
}
