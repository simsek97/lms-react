import { ICourse } from '@/data/course';

export const updateCoursesAction = (courses: ICourse[]) => ({ type: 'UPDATE_COURSES', data: courses });

export const resetCoursesAction = () => ({ type: 'RESET_COURSES' });
