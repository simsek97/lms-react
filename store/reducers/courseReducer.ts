import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IAction } from '@/store/index';
import { ICourse } from '@/data/course';
import { ICategory } from '@/data/category';
import { ILevel } from '@/data/level';

export interface ICourseStore {
  courses: ICourse[];
  myCourses: ICourse[];
  categories: ICategory[];
  levels: ILevel[];
}

interface ICourseData extends ICourseStore {}

const courseInitialState: ICourseStore = {
  courses: [],
  myCourses: [],
  categories: [],
  levels: []
};

const courseReducer = persistReducer(
  {
    storage,
    key: 'course'
  },
  (state: ICourseStore = courseInitialState, action: IAction<ICourse[]> | IAction<ICategory[]> | IAction<ILevel[]>): ICourseStore => {
    switch (action.type) {
      case 'UPDATE_COURSES':
        return {
          ...state,
          courses: action.data as ICourse[]
        };

      case 'UPDATE_MY_COURSES':
        return {
          ...state,
          myCourses: action.data as ICourse[]
        };

      case 'RESET_COURSES':
        return {
          ...state,
          courses: null
        };

      case 'RESET_MY_COURSES':
        return {
          ...state,
          myCourses: null
        };

      case 'UPDATE_CATEGORIES':
        return {
          ...state,
          categories: action.data as ICategory[]
        };

      case 'RESET_CATEGORIES':
        return {
          ...state,
          categories: null
        };

      case 'UPDATE_LEVELS':
        return {
          ...state,
          levels: action.data as ILevel[]
        };

      case 'RESET_LEVELS':
        return {
          ...state,
          levels: null
        };

      default:
        return state;
    }
  }
);

export default courseReducer;
