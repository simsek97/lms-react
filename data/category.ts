import { ICourse } from '@/data/course';

export interface ICategory {
  id?: string;
  name: string;
  slug: string;
  courses?: ICourse[];
}
