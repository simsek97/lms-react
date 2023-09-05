import { combineReducers } from 'redux';
import { all, spawn } from 'redux-saga/effects';

import { importSagas } from '@/store/middleware/import';
import bannerReducer from '@/store/reducers/bannerReducer';
import cartReducer from '@/store/reducers/cartReducer';
import courseReducer from '@/store/reducers/courseReducer';
import importReducer from '@/store/reducers/importReducer';
import userReducer from '@/store/reducers/userReducer';

// Combine reducers
const reducers = {
  banner: bannerReducer,
  cart: cartReducer,
  course: courseReducer,
  import: importReducer,
  user: userReducer
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
