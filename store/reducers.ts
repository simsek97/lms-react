import { combineReducers } from 'redux';
import { all, spawn } from 'redux-saga/effects';

import userReducer from '@/store/reducers/userReducer';
import cartReducer from '@/store/reducers/cartReducer';
import bannerReducer from '@/store/reducers/bannerReducer';
import importReducer from '@/store/reducers/importReducer';

import { importSagas } from './middleware/import';

// Combine reducers
const reducers = {
  user: userReducer,
  banner: bannerReducer,
  cart: cartReducer,
  import: importReducer
};

export function* rootSaga() {
  const allSagas = [].concat(importSagas());

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
