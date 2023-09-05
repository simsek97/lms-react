import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '@/store/index';
import { ICourse } from '@/data/course';

export interface ICourseStore {
  courses: ICourse[];
}

interface ICourseData extends ICourseStore {}

const courseInitialState: ICourseStore = {
  courses: []
};

const courseReducer = persistReducer(
  {
    storage,
    key: 'course'
  },
  (state: ICourseStore = courseInitialState, action: IAction<ICourse[]>): ICourseStore => {
    switch (action.type) {
      case 'UPDATE_COURSES':
        return {
          ...state,
          courses: action.data
        };

      case 'RESET_COURSES':
        return {
          ...state,
          courses: null
        };

      default:
        return state;
    }
  }
);

export default courseReducer;
