import React from 'react';

import { deepCompare } from '@kibalabs/core';
import { useInitialization, useNavigator } from '@kibalabs/core-react';
import { Alignment, BackgroundView, Button, ColorSettingView, Direction, Image, LinkBase, PaddingSize, Stack, Text } from '@kibalabs/ui-react';
import styled from 'styled-components';

import { useGlobals } from '../globalsContext';
import { getIsNextVersion } from '../util';

interface IStyledNavBarProps {
  color?: string;
}

const StyledNavBar = styled.div<IStyledNavBarProps>`
  width: 100%;
  box-sizing: border-box; // Prevent padding issue with the Modal and fixed positioned AppBar.
  flex-shrink: 0;
  background: ${(props: IStyledNavBarProps): string => (props.color ? props.color : '#1976d2')};
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);

  &.sticky {
    position: sticky;
    z-index: 999;
    top: 0;
    left: auto;
    right: 0;
  }

  &.fixed {
    position: fixed;
    z-index: 999;
    top: 0;
    left: auto;
    right: 0;
  }
`;


// TODO(krishan711): this wont need memo once its moved out of each page and to the "App" level
export const NavigationBar = React.memo((): React.ReactElement => {
  const { everypageClient, authManager } = useGlobals();
  const navigator = useNavigator();
  const [verificationSent, setVerificationSent] = React.useState<boolean>(false);
  const [hasVerifiedEmail, setHasVerifiedEmail] = React.useState<boolean>(true);

  const onLogoutClicked = (): void => {
    authManager.logout().then((): void => {
      navigator.navigateTo('/');
    });
  };

  const onResendVerificationClicked = (): void => {
    everypageClient.sendEmailVerificationForUser().then((): void => {
      setVerificationSent(true);
    });
  };

  // eslint-disable-next-line consistent-return
  useInitialization((): ((() => void) | void) => {
    setHasVerifiedEmail(authManager.getJwt().hasVerifiedEmail);
    if (!authManager.getJwt().hasVerifiedEmail) {
      const intervalId = setInterval((): void => {
        if (authManager.getJwt().hasVerifiedEmail) {
          setHasVerifiedEmail(true);
          clearInterval(intervalId);
        }
      }, 1000);
      return (): void => clearInterval(intervalId);
    }
  });

  return (
    <ColorSettingView variant='branded'>
      <StyledNavBar className='fixed'>
        <Stack direction={Direction.Horizontal} childAlignment={Alignment.Center} padding={PaddingSize.Wide1}>
          <LinkBase target='/'>
            <Stack direction={Direction.Vertical} childAlignment={Alignment.Center}>
              <Image height={getIsNextVersion() ? '30px' : '20px'} source='/assets/everypage-wordmark-dark.svg' alternativeText='Home' fitType='scale' />
              {getIsNextVersion() && (
                <Text variant='bold'>NEXT</Text>
              )}
            </Stack>
          </LinkBase>
          <Stack.Item growthFactor={1} shrinkFactor={1} />
          <Button
            variant='secondary'
            target='https://www.notion.so/kibalabs/everypage-learning-12109edaac1e4d5eb08672cadaa2fc26'
            targetShouldOpenSameTab={false}
            text='Tutorials'
          />
          <Button
            variant='tertiary'
            onClicked={onLogoutClicked}
            text='Log out'
          />
        </Stack>
        {!hasVerifiedEmail && (
          <BackgroundView color='$colors.banner'>
            <Stack direction={Direction.Horizontal} padding={PaddingSize.Wide} defaultGutter={PaddingSize.Wide} shouldAddGutters={true} childAlignment={Alignment.Center}>
              <Text variant='colored'>You need to verify your account before you can create and edit sites. Please check your email.</Text>
              {!verificationSent && (
                <Button
                  variant='secondary'
                  onClicked={onResendVerificationClicked}
                  text='Resend Verification'
                />
              )}
              {verificationSent && (
                <Text variant='colored'>Email sent.</Text>
              )}
            </Stack>
          </BackgroundView>
        )}
      </StyledNavBar>
    </ColorSettingView>
  );
}, deepCompare);

NavigationBar.displayName = 'NavigationBar';
