import { motion } from 'framer-motion';
import Link from 'next/link';

import { ICategory } from '@/data/category';

const Categories = ({ categories, categoriesToken }) => {
  return (
    <div className='categories-area ptb-100'>
      <div className='container'>
        <div className='section-title'>
          <span className='top-title'>Categories</span>
        </div>

        <div className='row'>
          {categories.length > 0 &&
            categories.map((cat: ICategory) => (
              <motion.div
                key={cat.id}
                className='col-lg-3 col-sm-6'
                whileHover={{
                  scale: 1.02,
                  originX: 0,
                  transition: { duration: 0.5 }
                }}
                initial='hidden'
                whileInView='visible'
                transition={{
                  type: 'spring',
                  duration: 1,
                  bounce: 0.3
                }}
                variants={{
                  visible: { opacity: 1, scale: 1 },
                  hidden: { opacity: 0, scale: 0 }
                }}>
                <Link href={`/category/${cat.slug}`}>
                  <a className='single-categorie d-flex justify-content-between align-items-center align-items-center'>
                    <h3>{cat.name}</h3>
                    <i className='flaticon-puzzle'></i>
                  </a>
                </Link>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
