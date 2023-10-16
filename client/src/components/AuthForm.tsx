'use client'
import React, { useRef } from 'react';
import { useSignupForm } from '../hooks/useSignupForm';
import { useRequestWithUiErrors } from '../hooks/useRequestWithUiErrors';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useRouter } from 'next/navigation';

export interface Props {
  icon: any;
  submitUrl: string;
  title: string;
  isSignup?: boolean
}

const AuthFrom = (props: React.PropsWithChildren<Props>) => {
  const {icon, title, isSignup, submitUrl, children} = props;
  const resetFormCallback = useRef<() => void | undefined>();
  const { push } = useRouter();
  const {
    email, handleEmail,
    password, handlePassword,
    name, handleName,
    surname, handleSurname
  } = useSignupForm(resetFormCallback.current);
  const body = { email, password }

  const { doRequest, uiErrors, resetErrors } = useRequestWithUiErrors({
    url: submitUrl,
    method: 'post',
    body: isSignup
      ? { ...body, name, surname }
      : body,
    onSuccess: () => push('/web-app')
  });
  resetFormCallback.current = resetErrors;

  const onSubmit = async (e: any) => {
    e.preventDefault();

    await doRequest();
  }

  return (
    <Container
      style={{ marginTop: "50px" }}
      component="div"
      maxWidth="xs"
    >
      <div>
        <Grid
          container
          justifyContent={"center"}
          padding="10px 0"
        >
          <Avatar>
            {icon}
          </Avatar>
          <Typography
            component="h3"
            variant="h5"
            justifyContent="center"
            style={{
              marginLeft: "10px",
              display: "flex",
              alignItems: "center"
            }}
          >
            {title}
          </Typography>
        </Grid>
        <form noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleName}
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>)}
            {isSignup && (
              <Grid item xs={12} sm={6}>
                <TextField
                  onChange={handleSurname}
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                />
              </Grid>)}
            <Grid item xs={12}>
              <TextField
                onChange={handleEmail}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePassword}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {uiErrors && (
            <Grid marginTop="16px">
              {uiErrors}
            </Grid>)}
          <Grid marginTop="16px">
            <Button
              disabled={!email || !password}
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
            >
              {title}
            </Button>
          </Grid>
          <Grid
            marginTop="16px"
            container
            justifyContent={"center"}
          >
            {children}
          </Grid>
        </form>
      </div>
    </Container>);
}

export default AuthFrom;
