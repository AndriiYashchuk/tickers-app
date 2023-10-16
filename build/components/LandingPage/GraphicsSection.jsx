import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AssessmentIcon from '@mui/icons-material/Assessment';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import TimelineIcon from '@mui/icons-material/Timeline';
import PolylineIcon from '@mui/icons-material/Polyline';
import { FeatureCard } from './FeatureCard';
const GraphicsSection = () => {
    return (<Box mt={5} py={5} style={{ backgroundColor: '#f2f2f2' }}>
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Explore Our Features
        </Typography>

        <Grid container spacing={4} mt={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard title={'Real-time Data'} description={"Get real-time updates on stock prices, ensuring you're always ahead."} icon={QueryStatsIcon}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard title={'Portfolio Management'} description={"Organize and manage your stocks in one place with our intuitive tools."} icon={LibraryBooksIcon}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard title={'Analysis & Reports'} description={"Get detailed insights and analytics to make informed investment decisions."} icon={AssessmentIcon}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard title={'Historical Analysis'} description={"Access past data of your stocks to analyze your portfolio's performance over time."} icon={TimelineIcon}/>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeatureCard title={'Intuitive Design'} description={"Our user-friendly interface ensures you have a smooth experience managing your portfolio."} icon={PolylineIcon}/>
          </Grid>

        </Grid>
      </Container>
    </Box>);
};
export default GraphicsSection;
