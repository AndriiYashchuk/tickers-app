import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const style = {
    backgroundColor: '#f7f7f7',
};
export const Footer = ({ email, phone, author }) => (React.createElement(Box, { mt: 5, py: 3, style: style },
    React.createElement(Container, null,
        React.createElement(Grid, { container: true, spacing: 3 },
            React.createElement(Grid, { item: true, xs: 12, md: 3 },
                React.createElement(Typography, { variant: "h6" }, "Stock Portfolio Manager"),
                React.createElement(Typography, { variant: "body2" }, "Dedicated to providing the best tools for managing your stock portfolio seamlessly.")),
            React.createElement(Grid, { item: true, xs: 12, md: 3 },
                React.createElement(Typography, { variant: "h6" }, "Quick Links"),
                React.createElement(Box, { mt: 1 },
                    React.createElement(Link, { href: "/", display: "block", variant: "body2" }, "Home"),
                    React.createElement(Link, { href: "/about", display: "block", variant: "body2" }, "About"),
                    React.createElement(Link, { href: "/web-app", display: "block", variant: "body2" }, "Manage Portfolio"),
                    React.createElement(Link, { href: "/contact", display: "block", variant: "body2" }, "Contact"))),
            React.createElement(Grid, { item: true, xs: 12, md: 3 },
                React.createElement(Typography, { variant: "h6" }, "Contact Us"),
                React.createElement(Box, { mt: 1 },
                    email && React.createElement(Typography, { variant: "body2" },
                        "Email: ",
                        email),
                    phone && React.createElement(Typography, { variant: "body2" },
                        "Phone: ",
                        phone))),
            author && (React.createElement(Grid, { item: true, xs: 12, md: 3 },
                React.createElement(Typography, { variant: "h6" }, "Developed By"),
                React.createElement(Box, { mt: 1 },
                    React.createElement(Link, { href: author.link, target: "_blank", rel: "noopener", variant: "body2", style: {
                            display: 'flex',
                            alignItems: 'center'
                        } },
                        React.createElement(Typography, { variant: "body2" }, author.name),
                        React.createElement(LinkedInIcon, null)))))),
        React.createElement(Box, { mt: 3, borderTop: 1, borderColor: "divider", pt: 2 },
            React.createElement(Typography, { variant: "body2", align: "center" },
                "\u00A9 ",
                new Date().getFullYear(),
                " Stock Portfolio Manager tickers-app.com.",
                React.createElement("br", null),
                "All rights reserved.")))));
