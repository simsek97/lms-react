import { combineReducers } from 'redux';
import { all, spawn } from 'redux-saga/effects';

import bannerReducer from '@/store/reducers/bannerReducer';
import cartReducer from '@/store/reducers/cartReducer';
import courseReducer from '@/store/reducers/courseReducer';
import subscriptionReducer from '@/store/reducers/subscriptionReducer';
import userReducer from '@/store/reducers/userReducer';

// Combine reducers
const reducers = {
  banner: bannerReducer,
  cart: cartReducer,
  course: courseReducer,
  subscription: subscriptionReducer,
  user: userReducer
};

export function* rootSaga() {
  // const allSagas = [].concat(importSagas());
  const allSagas = [];

  yield all(
    allSagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield saga;
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}

export default combineReducers(reducers);
