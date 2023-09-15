import { ICategory } from '@/data/category';
import { ICourse } from '@/data/course';
import { ILevel } from '@/data/level';

export const updateCoursesAction = (courses: ICourse[]) => ({ type: 'UPDATE_COURSES', data: courses });
export const updateFeaturedCoursesAction = (courses: ICourse[]) => ({ type: 'UPDATE_FEATURED_COURSES', data: courses });
export const updateMyCoursesAction = (courses: ICourse[]) => ({ type: 'UPDATE_MY_COURSES', data: courses });
export const updateCategoriesAction = (categories: ICategory[]) => ({ type: 'UPDATE_CATEGORIES', data: categories });
export const updateLevelsAction = (levels: ILevel[]) => ({ type: 'UPDATE_LEVELS', data: levels });

export const resetCoursesAction = () => ({ type: 'RESET_COURSES' });
export const resetFeaturedCoursesAction = () => ({ type: 'RESET_FEATURED_COURSES' });
export const resetMyCoursesAction = () => ({ type: 'RESET_MY_COURSES' });
export const resetCategoriesAction = () => ({ type: 'RESET_CATEGORIES' });
export const resetLevelsAction = () => ({ type: 'RESET_LEVELS' });
