import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import CatRow from '@/components/Admin/CatRow';
import GeneralLoader from '@/utils/GeneralLoader';
import baseUrl from '@/utils/baseUrl';

const Index = ({ user }) => {
  const { lms_react_users_token } = parseCookies();
  const [levels, setLevels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const payload = {
        headers: { Authorization: lms_react_users_token }
      };
      const response = await axios.get(`${baseUrl}/api/levels`, payload);
      setLevels(response.data.levels);
      setLoading(false);
    } catch (err) {
      let {
        response: {
          data: { message }
        }
      } = err;
      toast.error(message, {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmDelete = (catId) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to delete this? This may effect on courses if any of course are under this level',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(catId)
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const handleDelete = async (catId) => {
    try {
      const payload = {
        headers: { Authorization: lms_react_users_token },
        params: { catId }
      };
      const response = await axios.delete(`${baseUrl}/api/levels`, payload);
      toast.success(response.data.message, {
        style: {
          border: '1px solid #4BB543',
          padding: '16px',
          color: '#4BB543'
        },
        iconTheme: {
          primary: '#4BB543',
          secondary: '#FFFAEE'
        }
      });

      fetchData();
    } catch (err) {
      let {
        response: {
          data: { message }
        }
      } = err;
      toast.error(message, {
        style: {
          border: '1px solid #ff0033',
          padding: '16px',
          color: '#ff0033'
        },
        iconTheme: {
          primary: '#ff0033',
          secondary: '#FFFAEE'
        }
      });
    } finally {
      fetchData();
    }

    // router.reload(`/admin/levels/`);
  };

  return (
    <AdminLayout title='Levels' user={user}>
      <div className='main-content-box'>
        {/* Nav */}
        <ul className='nav-style1'>
          <li>
            <Link href='/admin/levels/'>
              <a className='active'>Levels</a>
            </Link>
          </li>
          <li>
            <Link href='/admin/levels/create/'>
              <a>Create</a>
            </Link>
          </li>
        </ul>

        {loading ? (
          <GeneralLoader />
        ) : (
          <div className='table-responsive'>
            <table className='table table-hover align-middle fs-14'>
              <thead>
                <tr>
                  <th scope='col'>Levels</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {levels.length > 0 ? (
                  levels.map((cat) => <CatRow {...cat} key={cat.id} onDelete={() => confirmDelete(cat.id)} />)
                ) : (
                  <tr>
                    <td colSpan={3} className='text-center py-3'>
                      Empty!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination */}
        {/* <div className="col-lg-12 col-md-12">
										<div className="pagination-area text-center m-3">
											<a
												href="#"
												className="prev page-numbers"
											>
												<i className="bx bx-chevrons-left"></i>
											</a>
											<span
												className="page-numbers current"
												aria-current="page"
											>
												1
											</span>
											<a
												href="#"
												className="page-numbers"
											>
												2
											</a>
											<a
												href="#"
												className="page-numbers"
											>
												3
											</a>
											<a
												href="#"
												className="page-numbers"
											>
												4
											</a>
											<a
												href="#"
												className="next page-numbers"
											>
												<i className="bx bx-chevrons-right"></i>
											</a>
										</div>
									</div> */}
      </div>
    </AdminLayout>
  );
};

export default Index;
