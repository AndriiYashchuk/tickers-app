import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

export const DashboardSkeletons = () => (
  <Grid container spacing={0} mt={2}>
    <Grid item xs={12} md={4} xl={3}>
      <Stack spacing={1} alignItems={'center'} paddingLeft={1} paddingRight={1}>
        <Skeleton variant="rectangular" width={"100%"} height={300} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Skeleton variant="rectangular" width={"100%"} height={50} />
      </Stack>
    </Grid>

    <Grid item xs={12} md={4} xl={3}>
      <Stack spacing={1} alignItems={'center'} paddingLeft={1} paddingRight={1}>
        <Skeleton variant="rectangular" width={"100%"} height={100} />
        <Skeleton variant="rectangular" width={"100%"} height={200} />
        <Skeleton variant="rectangular" width={"100%"} height={300} />
      </Stack>
    </Grid>

    <Grid item xs={12} md={4} xl={3}>
      <Stack spacing={1} alignItems={'center'} paddingLeft={1} paddingRight={1}>
        <Skeleton variant="rectangular" width={"100%"} height={300} />
        <Skeleton variant="rectangular" width={"100%"} height={100} />
        <Skeleton variant="rectangular" width={"100%"} height={100} />
        <Skeleton variant="rectangular" width={"100%"} height={100} />
      </Stack>
    </Grid>
  </Grid>
);


