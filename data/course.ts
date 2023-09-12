import { IS3Object } from '@/data/s3object';
import { ILevel } from './level';
import { ICategory } from './category';

export interface ICourse {
  id?: string;
  title?: string;
  slug?: string;
  shortDesc?: string;
  overview?: string;
  latestPrice?: number;
  beforePrice?: number;
  lessons?: string;
  duration?: string;
  image?: IS3Object;
  requirements?: string;
  whatYouWillLearn?: string;
  whoIsThisCourseFor?: string;
  catID?: string;
  category?: ICategory;
  levelID?: string;
  level?: ILevel;
  inHomePage?: string;
  inHomePageSetAt?: string;
  isClass?: string;
}
