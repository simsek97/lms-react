import React from 'react';
import { motion } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

interface ISubmitButton {
  btnText?: string;
  btnClass?: string;
  loading?: boolean;
  disabled?: boolean;
  btnOnClick?: any;
  buttonType?: 'button' | 'submit' | 'reset';
}

const SubmitButton = ({ loading, disabled, btnText, btnClass, btnOnClick, buttonType }: ISubmitButton) => {
  return (
    <Button
      variant='contained'
      type={buttonType || 'submit'}
      className={btnClass || 'default-btn'}
      disabled={disabled || false}
      onClick={btnOnClick || null}
      startIcon={loading ? <CircularProgress color='inherit' size={16} sx={{ mr: 1 }} /> : null}>
      {btnText || 'Submit'}
    </Button>
  );
};

export default SubmitButton;
