import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const QuestionSection = ({ title, description }) => (<Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>
        {title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>
        {description}
      </Typography>
    </AccordionDetails>
  </Accordion>);
export const Faq = () => (<Box my={5}>
    <Typography variant="h4" align="center" gutterBottom>
      Frequently Asked Questions
    </Typography>

    <QuestionSection title="How does Stock Portfolio Manager work?" description={`
      Our platform integrates with various stock market APIs to fetch real-time and
      historical data. Simply add your tickers and let us do the rest!`}/>

    <QuestionSection title="Is my data secure?" description={`
          Absolutely! We prioritize user data security and employ industry-standard encryption
          methods to ensure your portfolio data remains private.`}/>
  </Box>);
