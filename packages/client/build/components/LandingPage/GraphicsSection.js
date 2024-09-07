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
const WaitingFeature = () => (React.createElement(React.Fragment, null,
    React.createElement(Grid, { item: true, xs: 12, md: 4 },
        React.createElement(FeatureCard, { title: 'Analysis & Reports', description: "Get detailed insights and analytics to make informed investment decisions.", icon: AssessmentIcon, badgeContent: 'Will be ready soon' })),
    React.createElement(Grid, { item: true, xs: 12, md: 4 },
        React.createElement(FeatureCard, { title: 'Historical Analysis', description: "Access past data of your stocks to analyze your portfolio's performance over time.", icon: TimelineIcon, badgeContent: 'Will be ready soon' }))));
const GraphicsSection = () => {
    const renderWaitingFeatures = () => (React.createElement(WaitingFeature, null));
    return (React.createElement(Box, { mt: 5, py: 5, style: { backgroundColor: '#f2f2f2' } },
        React.createElement(Container, null,
            React.createElement(Typography, { variant: "h4", align: "center", gutterBottom: true }, "Explore Our Features"),
            React.createElement(Grid, { container: true, spacing: 4, mt: 4 },
                React.createElement(Grid, { item: true, xs: 12, md: 4 },
                    React.createElement(FeatureCard, { title: 'Real-time Data', description: "Get real-time updates on stock prices, ensuring you're always ahead.", icon: QueryStatsIcon, badgeContent: "" })),
                React.createElement(Grid, { item: true, xs: 12, md: 4 },
                    React.createElement(FeatureCard, { title: 'Intuitive Design', description: "Our user-friendly interface ensures you have a smooth experience managing your portfolio.", icon: PolylineIcon, badgeContent: "" })),
                React.createElement(Grid, { item: true, xs: 12, md: 4 },
                    React.createElement(FeatureCard, { title: 'Portfolio Management', description: "Organize and manage your stocks in one place with our intuitive tools.", icon: LibraryBooksIcon, badgeContent: 'Will be ready soon' }))))));
};
export default GraphicsSection;
