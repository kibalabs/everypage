import React from 'react';
import { isValidEmail } from '@kibalabs/core';
import { useHistory } from '@kibalabs/core-react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { useGlobals } from '../globalsContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const RegisterPage = (): React.ReactElement => {
  const { everypageClient } = useGlobals();
  const history = useHistory();
  const [firstName, setFirstName] = React.useState<string>('');
  const [firstNameError, setFirstNameError] = React.useState<string | undefined>(undefined);
  const [lastName, setLastName] = React.useState<string>('');
  const [lastNameError, setLastNameError] = React.useState<string | undefined>(undefined);
  const [email, setEmail] = React.useState<string>('');
  const [emailError, setEmailError] = React.useState<string | undefined>(undefined);
  const [password, setPassword] = React.useState<string>('');
  const [passwordError, setPasswordError] = React.useState<string | undefined>(undefined);
  const [shouldJoinNewsletter, setShouldJoinNewsletter] = React.useState<boolean>(false);
  const classes = useStyles();

  const onLoginClicked = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName) {
      setFirstNameError('Please enter a valid first name');
      return;
    }
    if (!lastName) {
      setLastNameError('Please enter a valid last name');
      return;
    }
    if (!email || !isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      return;
    }
    if (!password || password.length < 7) {
      setPasswordError('Please enter a valid password. It should be at least 7 characters long');
      return;
    }
    setEmailError(undefined);
    setPasswordError(undefined);
    everypageClient.create_user(firstName, lastName, email, password, shouldJoinNewsletter).then((): void => {
      history.navigate('/', { replace: true });
    }).catch((error: Error): void => {
      if (error.message.includes('USER_EMAIL_EXISTS')) {
        setEmailError('A user with this email exists. Please log in instead.');
      } else {
        setPasswordError('Something went wrong on our side. Please try again later.')
      }
    });
  }

  const onFirstNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFirstName(event.target.value);
    setFirstNameError(undefined);
  }

  const onLastNameChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setLastName(event.target.value);
    setLastNameError(undefined);
  }

  const onEmailChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setEmail(event.target.value);
    setEmailError(undefined);
  }

  const onPasswordChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  }

  const onShouldJoibNewsletterChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShouldJoinNewsletter(event.target.checked);
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Create your everypage account
        </Typography>
        <form className={classes.form} noValidate onSubmit={onLoginClicked}>
          <Grid container spacing={2}>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                margin='normal'
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={onFirstNameChanged}
                error={firstNameError !== undefined}
                helperText={firstNameError}
              />
              <TextField
                variant="outlined"
                margin='normal'
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={onLastNameChanged}
                error={lastNameError !== undefined}
                helperText={lastNameError}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                value={email}
                onChange={onEmailChanged}
                error={emailError !== undefined}
                helperText={emailError}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={onPasswordChanged}
                error={passwordError !== undefined}
                helperText={passwordError}
              />
            </Grid>
            <FormControlLabel
              control={<Checkbox checked={shouldJoinNewsletter} onChange={onShouldJoibNewsletterChanged} color='primary' />}
              label='Keep me updated (no spam, we promise)!'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >Create account</Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href='#' variant='body2'>
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href='/login' variant='body2'>{'Already got an account? Log in'}</Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'By creating an account, you are agreeing to our '}
          <Link color='inherit' href='https://terms.everypagehq.com'>
            Terms of Use
          </Link>
          {' and '}
          <Link color='inherit' href='https://privacy.everypagehq.com'>
            Privacy Policy
          </Link>
        </Typography>
      </Box>
      <Box mt={4}>
        <Typography variant='body2' color='textSecondary' align='center'>
          {'Copyright © '}
          <Link color='inherit' href='https://www.kibalabs.com'>
            Kiba Labs
          </Link>
          {` ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </Container>
  );
}


// Your privacy is important to us. It is Kiba Labs' policy to respect your privacy regarding any information we may collect from you across our website, https://www.everypagehq.com, and other sites we own and operate.
// We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
// We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.
// We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
// Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
// You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
// Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
// This policy is effective as of 1 June 2020.

// 1. Terms
// By accessing the website at https://www.everypagehq.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
// 2. Use Licence
// Permission is granted to temporarily download one copy of the materials (information or software) on Kiba Labs' website for personal, non-commercial transitory viewing only. This is the grant of a licence, not a transfer of title, and under this licence you may not:
// modify or copy the materials;
// use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
// attempt to decompile or reverse engineer any software contained on Kiba Labs' website;
// remove any copyright or other proprietary notations from the materials; or
// transfer the materials to another person or "mirror" the materials on any other server.
// This licence shall automatically terminate if you violate any of these restrictions and may be terminated by Kiba Labs at any time. Upon terminating your viewing of these materials or upon the termination of this licence, you must destroy any downloaded materials in your possession whether in electronic or printed format.
// 3. Disclaimer
// The materials on Kiba Labs' website are provided on an 'as is' basis. Kiba Labs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
// Further, Kiba Labs does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
// 4. Limitations
// In no event shall Kiba Labs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Kiba Labs' website, even if Kiba Labs or a Kiba Labs authorised representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
// 5. Accuracy of materials
// The materials appearing on Kiba Labs' website could include technical, typographical, or photographic errors. Kiba Labs does not warrant that any of the materials on its website are accurate, complete or current. Kiba Labs may make changes to the materials contained on its website at any time without notice. However Kiba Labs does not make any commitment to update the materials.
// 6. Links
// Kiba Labs has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Kiba Labs of the site. Use of any such linked website is at the user's own risk.
// 7. Modifications
// Kiba Labs may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
// 8. Governing Law
// These terms and conditions are governed by and construed in accordance with the laws of the UK and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
