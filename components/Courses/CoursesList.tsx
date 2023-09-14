import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CourseCard from '@/components/Courses/CourseCard';
import { ICourse } from '@/data/course';
import { ISubscriptionTier } from '@/data/subscription-tier';
import { updateSubscriptionsAction } from '@/store/actions/subscriptionActions';
import { IReduxStore } from '@/store/index';
import CourseSkeletonLoader from '@/utils/CourseSkeletonLoader';
import getTiers from '@/utils/getTiers';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { toastSuccessStyle } from '@/utils/toast';
import { getS3File } from '@/utils/getS3File';
import { updateCoursesAction } from '@/store/actions/courseActions';

const CoursesList = ({ courses, user }) => {
  const [subscriptionTiers, setSubscriptionTiers] = React.useState<ISubscriptionTier[]>([]);
  const [isLoading, setLoading] = React.useState(true);

  const router = useRouter();
  const dispatch = useDispatch();

  const storeSubscriptionTiers = useSelector((state: IReduxStore) => state.subscription.subscriptions);

  const handleImageError = React.useMemo(
    () => async (courses: ICourse[], course: ICourse) => {
      if (course?.image?.key) {
        const imageUrl = await getS3File(course.image.key);

        const updatedCourses = courses.map((c: ICourse) => {
          if (c.id === course.id) {
            c.image.url = imageUrl;
          }
          return c;
        });

        dispatch(updateCoursesAction(updatedCourses));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const addToCart = (subscriptionTier: ISubscriptionTier) => {
    dispatch({
      type: 'ADD_TO_CART',
      data: subscriptionTier
    });

    toast.success('Subscription added to your cart', toastSuccessStyle);

    setTimeout(() => {
      router.push('/checkout');
    }, 1000);
  };

  const listTiers = async () => {
    const tiers = await getTiers(20);

    dispatch(updateSubscriptionsAction(tiers));
    setSubscriptionTiers(tiers);
  };

  React.useEffect(() => {
    listTiers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='row justify-content-center'>
      {isLoading ? (
        <CourseSkeletonLoader />
      ) : (
        <>
          {courses.length > 0 ? (
            courses.map((course: ICourse) => (
              <CourseCard
                key={course.id}
                courses={courses}
                course={course}
                subscriptions={subscriptionTiers}
                user={user}
                onAddCart={addToCart}
                handleImageError={handleImageError}
              />
            ))
          ) : (
            <h3>Empty</h3>
          )}
        </>
      )}
    </div>
  );
};

export default CoursesList;
