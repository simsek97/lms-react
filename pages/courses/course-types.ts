export interface ICourse {
  id?: string;
  title: string;
  slug: string;
  short_desc: string;
  overview: string;
  latest_price: number;
  before_price: number;
  lessons: string;
  duration: string;
  image: string;
  access_time: string;
  requirements: string;
  what_you_will_learn: string;
  what_is_this_course_for: string;
  user_id: string;
  catId: string;
  approved: number;
  in_home_page: number;
  im_home_page_set_at: Date;
  is_class: number;
  created_at?: Date;
  updated_at?: Date;
}
