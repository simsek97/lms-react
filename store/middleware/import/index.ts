import { takeLatest } from 'redux-saga/effects';

import { sagaAddSubscription } from '@/store/middleware/import/sagaAddSubscription';

export function* importSagas() {
  yield takeLatest('ADD_SUBSCRIPTION', sagaAddSubscription);
}
