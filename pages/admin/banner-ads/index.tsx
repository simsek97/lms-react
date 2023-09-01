import { GraphQLQuery } from '@aws-amplify/api';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { API, Storage, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import AdminLayout from '@/components/Admin/AdminLayout';
import { AdBanner, CreateAdBannerMutation, DeleteAdBannerMutation, ListAdBannersQuery } from '@/src/API';
import { createAdBanner, deleteAdBanner } from '@/src/graphql/mutations';
import { listAdBanners } from '@/src/graphql/queries';
import SubmitButton from '@/utils/SubmitButton';
import Box from '@mui/material/Box';

const Index = ({ user }) => {
  const [bannerAds, setBannerAds] = useState<AdBanner[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [newBanner, setNewBanner] = React.useState<File>(null);
  const [reload, setReload] = React.useState<boolean>(false);
  const [page, setPage] = React.useState(0);
  const [pageToken, setPageToken] = React.useState(null);

  const pageSize = 10;

  const columns = [
    {
      flex: 30,
      minWidth: 200,
      field: 'bannerKey',
      headerName: 'Banner'
    },
    {
      width: 200,
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => {
        return <Button onClick={() => handleDelete(params.row)}>Delete</Button>;
      }
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // const profilePhotoSize = files[0].size / 1024 / 1024;
    // if (profilePhotoSize > 2) {
    //   toast.error('The banner size greater than 2 MB. Make sure less than 2 MB.', {
    //     style: {
    //       border: '1px solid #ff0033',
    //       padding: '16px',
    //       color: '#ff0033'
    //     },
    //     iconTheme: {
    //       primary: '#ff0033',
    //       secondary: '#FFFAEE'
    //     }
    //   });
    //   e.target.value = null;
    //   return;
    // }

    setNewBanner(files[0]);

    // setProfilePreview(window.URL.createObjectURL(files[0]));
  };

  const handleDelete = async (banner: AdBanner) => {
    // setNewBanner(files[0]);

    try {
      await Storage.remove(banner['bannerKey']);

      // Remove the banner from DynamoDB
      const { data } = await API.graphql<GraphQLQuery<DeleteAdBannerMutation>>({
        query: deleteAdBanner,
        variables: {
          input: {
            id: banner.id
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedBanners = bannerAds.filter((b) => b.id !== banner.id);
      setBannerAds(updatedBanners);

      toast.success('Banner has been successfully deleted.');
    } catch (err) {
      console.log(err);
      toast.error('Banner could not be deleted.', {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!newBanner) {
        return false;
      }
      const upload = await Storage.put(newBanner['name'], newBanner);

      // Get S3 signed url
      // const uploadUrl = await getS3File(upload.key, 'public');

      // Insert the banner on DynamoDB
      const { data } = await API.graphql<GraphQLQuery<CreateAdBannerMutation>>({
        query: createAdBanner,
        variables: {
          input: {
            bannerKey: upload.key
          }
        },
        authMode: 'AMAZON_COGNITO_USER_POOLS'
      });

      const updatedBanners = [...bannerAds, data.createAdBanner];
      setBannerAds(updatedBanners);

      setLoading(false);
      setNewBanner(null);

      toast.success('Banner has been successfully saved.');
    } catch (err) {
      console.log(err);
      toast.error('Banner could not be saved.', {
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
    const listBanners = async (limit: number) => {
      try {
        setLoading(true);

        const { data } = await API.graphql<GraphQLQuery<ListAdBannersQuery>>(graphqlOperation(listAdBanners, { limit }));

        setPageToken(data.listAdBanners.nextToken);

        const updatedBanners = [...bannerAds, ...data.listAdBanners.items];
        setBannerAds(updatedBanners.sort((a, b) => (a.createdAt as any) - (b.createdAt as any)));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    listBanners(pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <AdminLayout title='Banner Ads' user={user}>
      <Box sx={{ mt: 3 }}>
        <DataGrid autoHeight loading={isLoading} rows={bannerAds} columns={columns} hideFooter={true} rowHeight={100} />
        <Box sx={{ textAlign: 'center', p: 1, gap: 1 }}>
          {pageToken && (
            <Button
              startIcon={isLoading && <CircularProgress size={12} color='inherit' />}
              variant='contained'
              onClick={() => setPage(page + 1)}>
              Show More
            </Button>
          )}
        </Box>
        <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader title='Add New Banner' />
              <CardContent sx={{ px: 2 }}>
                <input
                  type='file'
                  className='form-control file-control'
                  name='profilePhoto'
                  accept='image/*'
                  onChange={handleChange}
                  required={true}
                />
              </CardContent>

              <CardActions sx={{ px: 2 }}>
                <SubmitButton disabled={false} loading={isLoading} btnText='Save' btnClass='btn default-btn' />
              </CardActions>
            </Card>
          </form>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Index;
