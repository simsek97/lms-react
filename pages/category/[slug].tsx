import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import CoursesList from '@/components/Courses/CoursesList';
import Categories from '@/components/Index/Categories';
import PageContent from '@/components/_App/PageContent';
import { ICategory } from '@/data/category';
import { IReduxStore } from '@/store/index';

export default function CategoryPage({ user }) {
  const router = useRouter();
  const { slug } = router.query;

  const storeCats = useSelector((store: IReduxStore) => store.course.categories);
  const storeCat: ICategory = storeCats.find((c) => c.slug === slug);

  return (
    <PageContent pageTitle='Category' activePageText={storeCat.name}>
      <div className='pt-100 pb-70'>
        <div className='container'>
          <CoursesList courseType='courses' isLoading={false} courses={storeCat.courses.items} user={user} />
        </div>
      </div>
      <div className='pt-100 pb-70'>
        <div className='container'>
          <Categories categories={storeCats} categoriesToken={null} />
        </div>
      </div>
    </PageContent>
  );
}
