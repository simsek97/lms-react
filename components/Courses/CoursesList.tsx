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

const CoursesList = ({ courses, user }) => {
  const [subscriptionTiers, setSubscriptionTiers] = React.useState<ISubscriptionTier[]>([]);
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const storeSubscriptionTiers = useSelector((state: IReduxStore) => state.subscription.subscriptions);

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
    if (storeSubscriptionTiers.length === 0) {
      listTiers();
    } else {
      setSubscriptionTiers(storeSubscriptionTiers);
    }

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
      {loading ? (
        <CourseSkeletonLoader />
      ) : (
        <>
          {courses.length > 0 ? (
            courses.map((course: ICourse) => (
              <CourseCard
                key={course.id}
                course={course}
                subscriptions={subscriptionTiers}
                userId={user && user.id}
                onAddCart={addToCart}
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
