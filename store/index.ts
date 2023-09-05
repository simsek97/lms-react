import { Action, Store, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import reducers, { rootSaga } from '@/store/reducers';
import { IBannerStore } from '@/store/reducers/bannerReducer';
import { ICartStore } from '@/store/reducers/cartReducer';
import { ICourseStore } from '@/store/reducers/courseReducer';
import { IImportStore } from '@/store/reducers/importReducer';
import { IUserStore } from '@/store/reducers/userReducer';

export const appConfig = {
  appName: 'SmartKid Games'
};

export interface IReduxStore {
  banner: IBannerStore;
  cart: ICartStore;
  course: ICourseStore;
  import: IImportStore;
  user: IUserStore;
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
