import { IS3Object } from '@/data/s3object';

export interface ICourse {
  id?: string;
  title: string;
  slug: string;
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
  levelID?: string;
  inHomePage?: string;
  inHomePageSetAt?: string;
  isClass?: string;
}
