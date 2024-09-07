import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const QuestionSection = ({ title, description }) => (React.createElement(Accordion, null,
    React.createElement(AccordionSummary, { expandIcon: React.createElement(ExpandMoreIcon, null) },
        React.createElement(Typography, null, title)),
    React.createElement(AccordionDetails, null,
        React.createElement(Typography, null, description))));
export const Faq = () => (React.createElement(Box, { my: 5 },
    React.createElement(Typography, { variant: "h4", align: "center", gutterBottom: true }, "Frequently Asked Questions"),
    React.createElement(QuestionSection, { title: "How does Stock Portfolio Manager work?", description: `
      Our platform integrates with various stock market APIs to fetch real-time and
      historical data. Simply add your tickers and let us do the rest!` }),
    React.createElement(QuestionSection, { title: "Is my data secure?", description: `
          Absolutely! We prioritize user data security and employ industry-standard encryption
          methods to ensure your portfolio data remains private.` })));
