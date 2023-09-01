/* eslint-disable react/display-name */
import React from 'react';
import PerfectScrollbar, { ScrollBarProps } from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';

type ScrollBarContainerProps = ScrollBarProps & {
  children: React.ReactNode;
};

const Scrollbar = React.forwardRef<PerfectScrollbar, ScrollBarContainerProps>((props, ref) => {
  const { children, ...other } = props;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflowX: 'auto' }}>
        {children}
      </Box>
    );
  }

  return (
    <PerfectScrollbar ref={ref as React.RefObject<PerfectScrollbar>} {...other}>
      {children}
    </PerfectScrollbar>
  );
});

export default Scrollbar;
