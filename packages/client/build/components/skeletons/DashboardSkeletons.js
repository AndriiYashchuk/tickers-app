import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
export const DashboardSkeletons = () => (React.createElement(Grid, { container: true, spacing: 0, mt: 2 },
    React.createElement(Grid, { item: true, xs: 12, md: 4, xl: 4 },
        React.createElement(Stack, { spacing: 1, alignItems: 'center', paddingLeft: 1, paddingRight: 1 },
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 300 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 200 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 110 }))),
    React.createElement(Grid, { item: true, xs: 12, md: 4, xl: 4 },
        React.createElement(Stack, { spacing: 1, alignItems: 'center', paddingLeft: 1, paddingRight: 1 },
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 100 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 200 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 310 }))),
    React.createElement(Grid, { item: true, xs: 12, md: 4, xl: 4 },
        React.createElement(Stack, { spacing: 1, alignItems: 'center', paddingLeft: 1, paddingRight: 1 },
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 300 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 200 }),
            React.createElement(Skeleton, { variant: "rectangular", width: "100%", height: 110 })))));
