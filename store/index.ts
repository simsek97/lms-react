import { Action, Store, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducers, { rootSaga } from '@/store/reducers';
import { ICartStore } from '@/store/reducers/cartReducer';
import { IUserStore } from '@/store/reducers/userReducer';
import { IBannerStore } from '@/store/reducers/bannerReducer';
import { IImportStore } from '@/store/reducers/importReducer';

export const appConfig = {
  appName: 'ProMed2.0'
};

export interface IReduxStore {
  user: IUserStore;
  banner: IBannerStore;
  cart: ICartStore;
  import: IImportStore;
}

const sagaMiddleware = createSagaMiddleware();

const store: Store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

// Run sagas
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface IAction<T> extends Action<string> {
  type: string;
  data?: T;
}

export default store;
