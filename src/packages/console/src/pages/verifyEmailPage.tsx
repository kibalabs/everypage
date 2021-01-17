import React from 'react';
import Helmet from 'react-helmet';

import { useHistory, useInitialization } from '@kibalabs/core-react';
import { Alignment, Box, Button, ContainingView, Direction, PaddingSize, ResponsiveContainingView, Stack, Text, TextAlignment } from '@kibalabs/ui-react';

import { useGlobals } from '../globalsContext';

export const VerifyEmailPage = (): React.ReactElement => {
  const { everypageClient, authManager } = useGlobals();
  const history = useHistory();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);

  const onResendVerificationClicked = (): void => {
    everypageClient.sendEmailVerificationForUser().then((): void => {
      setVerificationSent(true);
    });
  };

  useInitialization((): void | (() => void) => {
    if (authManager.getJwt().hasVerifiedEmail) {
      history.navigate('/', { replace: true });
      return null;
    }
    const intervalId = setInterval((): void => {
      if (authManager.getJwt().hasVerifiedEmail) {
        clearInterval(intervalId);
        history.navigate('/', { replace: true });
      }
    }, 1000);
    return (): void => clearInterval(intervalId);
  });

  return (
    <ContainingView isCenteredHorizontally>
      <ResponsiveContainingView size={12} sizeResponsive={{ small: 8, medium: 6, large: 5 }}>
        <Stack direction={Direction.Vertical} isFullHeight={true}>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Box variant='card' isFullWidth={false}>
            <Stack direction={Direction.Vertical} shouldAddGutters={true} defaultGutter={PaddingSize.Wide2}>
              <Text variant='header5' tag='h1' alignment={TextAlignment.Center}>Please check your email</Text>
              <Text>We need to verify your email before you can create and edit sites. It only takes a second, please check your inbox for an email from everypass@kibalabs.com.</Text>
              {!verificationSent && (
                <Stack.Item alignment={Alignment.Center}>
                  <Button
                    isFullWidth={false}
                    onClicked={onResendVerificationClicked}
                    text='Resend Verification'
                  />
                </Stack.Item>
              )}
              {verificationSent && (
                <Stack.Item alignment={Alignment.Center}>
                  <Text variant='bold'>Email sent.</Text>
                </Stack.Item>
              )}
            </Stack>
          </Box>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
        </Stack>
      </ResponsiveContainingView>
    </ContainingView>
  );
};
