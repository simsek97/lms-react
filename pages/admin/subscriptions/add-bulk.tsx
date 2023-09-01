import { GraphQLQuery } from '@aws-amplify/api';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React from 'react';
import * as XLSX from 'xlsx';

import AdminLayout from '@/components/Admin/AdminLayout';
import { ListSubscriptionTiersQuery } from '@/src/API';
import { listSubscriptionTiers } from '@/src/graphql/queries';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Scrollbar from '@/components/_App/ScrollBar';
import CardActions from '@mui/material/CardActions';
import SubmitButton from '@/utils/SubmitButton';
import { IReduxStore } from '@/store/index';
import {
  addSubscriptionAction,
  updateImportDataAction,
  updateImportPhaseAction,
  updateSubscriptionsAction
} from '@/store/actions/importActions';

const Index = ({ user }) => {
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [fileError, setFileError] = React.useState('');
  const [fileName, setFileName] = React.useState('');

  const fileRef = React.useRef();
  const dispatch = useDispatch();
  const theme = useTheme();
  // const mobileDevice = useMediaQuery(theme.breakpoints.down('md'));

  // Selectors
  const importData = useSelector((state: IReduxStore) => state.import.importData);
  const importPhase = useSelector((state: IReduxStore) => state.import.phase);

  const acceptableFilename = ['xlsx', 'xls'];

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerAlign: 'center',
      headerName: '#',
      width: 75,
      align: 'center'
    },
    {
      field: 'EmailAddress',
      headerName: 'Email',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'SubscriptionTitle',
      headerName: 'Subscription Title',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'SubscriptionTerm',
      headerName: 'Subscription Term',
      flex: 1,
      headerAlign: 'center'
    },
    {
      field: 'status',
      minWidth: 250,
      headerName: 'Status',
      flex: 1
    }
  ];

  const checkFileName = (name: string) => {
    return acceptableFilename.includes(name.split('.').pop().toLowerCase());
  };

  const readDataFromExcel = (data: any) => {
    const wb = XLSX.read(data);
    let sheetName = wb.SheetNames[0];
    const workSheet = wb.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(workSheet, { raw: false });

    const resData = jsonData.map((item: any, index) => ({ ...item, id: index + 1, status: 'Not started!' }));

    // Dispatch
    dispatch(updateImportDataAction(resData));
  };

  const handleFile = async (e: any) => {
    setLoading(true);
    const myFile = e.target.files[0];
    if (!myFile) {
      setLoading(false);
      return;
    }

    if (!checkFileName(myFile.name)) {
      setFileError('Invalid file type');
      setLoading(false);
      return;
    } else {
      setFileError('');
    }

    const data = await myFile.arrayBuffer();

    readDataFromExcel(data);

    setFileName(myFile.name);
    setLoading(false);
  };

  const handeSaveData = () => {
    if (importData.length > 0) {
      dispatch(addSubscriptionAction(importData));
    }
  };

  React.useEffect(() => {
    dispatch(updateImportPhaseAction(null, null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdminLayout title='Add Bulk Subscriptions' user={user}>
      <Card sx={{ width: '100%', mb: 5 }}>
        <CardHeader title='File Upload' subheader='Select a file and upload in order to add bulk subscriptions.' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant='filled'>
                <InputLabel htmlFor='avatar'>File</InputLabel>
                <FilledInput
                  id='bulkData'
                  value={fileName}
                  readOnly
                  error={fileError ? Boolean(fileError) : false}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Button color='primary' component='label'>
                        <input
                          ref={fileRef}
                          style={{ display: 'none' }}
                          accept='xlsx, xls'
                          id='excelFile'
                          type='file'
                          onChange={(e) => handleFile(e)}
                        />
                        Add
                      </Button>
                    </InputAdornment>
                  }
                />
                {fileError && <FormHelperText sx={{ color: 'red' }}>{fileError}</FormHelperText>}
              </FormControl>
              <Typography sx={{ mt: 2 }}>
                Use this <a href='/template/bulk-subscription-template.xlsx'>template</a> to fill your subscription information and use
                this file.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {importData.length > 0 && (
        <Card sx={{ width: '100%', mb: 3 }}>
          <CardHeader title='Data Review' />
          <Divider />
          <Scrollbar>
            <CardContent sx={{ display: 'flex', height: 'auto', width: '100%' }}>
              <DataGrid pagination loading={isLoading} rows={importData} columns={columns} />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <SubmitButton
                buttonType='button'
                disabled={importPhase === 'adding'}
                loading={importPhase === 'adding'}
                btnOnClick={handeSaveData}
                btnText='Submit'
              />
            </CardActions>
          </Scrollbar>
        </Card>
      )}
    </AdminLayout>
  );
};

export default Index;
