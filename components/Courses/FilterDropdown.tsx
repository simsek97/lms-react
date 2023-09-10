import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '@/utils/baseUrl';
import { ICategory } from '@/database/models/category';
import { useSelector } from 'react-redux';

import { IReduxStore } from '@/store/index';
import { ILevel } from '@/data/level';

const FilterDropdown = ({ level, category, courseSort }) => {
  const { selectedLevel, handleLevelChange } = level;
  const { selectedCategory, handleCategoryChange } = category;
  const { selectedSort, handleSortChange } = courseSort;

  const categories = useSelector((state: IReduxStore) => state.course.categories);
  const levels = useSelector((state: IReduxStore) => state.course.levels);

  return (
    <>
      <li>
        <select className='form-select form-control' value={selectedLevel} onChange={(e) => handleLevelChange(e.target.value)}>
          <option value=''>Filter By Grade</option>
          {levels?.map((level: ILevel) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      </li>

      <li>
        <select className='form-select form-control' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value=''>Filter By Category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </li>

      <li>
        <select className='form-select form-control' value={selectedSort} onChange={(e) => handleSortChange(e.target.value)}>
          <option value=''>Sort By</option>
          <option value='ASC'>Price: low to high</option>
          <option value='DESC'>Price: high to low</option>
        </select>
      </li>
    </>
  );
};

export default FilterDropdown;
