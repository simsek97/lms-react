import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { ICategory } from '@/database/models/category';

const FilterDropdown = () => {
  const { lms_react_users_token } = parseCookies();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [short, setShort] = useState<string>('');
  const [cat, setCat] = useState<string>('');
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const response = await axios.get(`${baseUrl}/api/categories`, payload);
      setCategories(response.data.categories);
    } catch (err) {
      let {
        response: {
          data: { message }
        }
      } = err;
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const query = router.query;
    router.push({
      pathname: '/courses',
      query: { ...query, short: short, cat: cat }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [short, cat]);

  return (
    <>
      <li>
        <select className='form-select form-control' name='cat' value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value=''>Filter By Category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </li>
      <li>
        <select className='form-select form-control' name='short' value={short} onChange={(e) => setShort(e.target.value)}>
          <option value=''>Sort By</option>
          <option value='ASC'>Price: low to high</option>
          <option value='DESC'>Price: high to low</option>
        </select>
      </li>
    </>
  );
};

export default FilterDropdown;
