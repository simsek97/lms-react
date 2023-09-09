import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { ICategory } from '@/data/category';
import getCategories from '@/utils/getCategories';

const Categories = ({ categories, categoriesToken }) => {
  const [cats, setCats] = React.useState<ICategory[]>(categories);
  const [pageToken, setPageToken] = React.useState(categoriesToken);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);

  const pageSize = 10;

  const fetchCategories = async (limit: number, nextToken: string) => {
    setLoading(true);

    try {
      setLoading(true);
      const dbCategories = await getCategories(limit, nextToken);

      setPageToken(dbCategories.nextToken);

      const updatedCategories = [...categories, ...dbCategories.items];
      setCats(updatedCategories.sort((a, b) => Number(a.id) - Number(b.id)) as ICategory[]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    // fetchCategories(pageSize, pageToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className='categories-area ptb-100'>
      <div className='container'>
        <div className='section-title'>
          <span className='top-title'>Categories</span>
        </div>

        <div className='row'>
          {cats.length > 0 &&
            cats.map((cat: ICategory) => (
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
                    <i className='flaticon-developer'></i>
                  </a>
                </Link>
              </motion.div>
            ))}

          {pageToken && (
            <div className='col-lg-12 '>
              <p className='text-center'>
                <Button
                  startIcon={isLoading && <CircularProgress size={14} color='inherit' />}
                  variant='contained'
                  onClick={() => setPage(page + 1)}>
                  Show More Categories
                </Button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
