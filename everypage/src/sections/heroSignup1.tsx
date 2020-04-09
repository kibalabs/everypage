import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import { Container, Grid, Image, Button, Text, Spacing } from '../components';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignup1Props {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  emailPlaceholderText?: string;
  emailButtonText?: string;
  emailSubtitleText?: string;
}

const Section = styled.div`
`;

const EmailForm = styled.div`
`;

const EmailInput = styled.input`
  width: 100%;
`;

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => {
  const onEmailSubmitClicked = (): void => {
    console.log('onEmailSubmitClicked');
  }

  return (
    <Container>
      <Grid>
        <Grid.Item size={1} sizeSmall={2} sizeMedium={2} sizeLarge={3}><div /></Grid.Item>
        <Grid.Item size={10} sizeSmall={8} sizeMedium={8} sizeLarge={6}>
          <Section>
            <Spacing size='extra-extra-wide'/>
            { props.logoImageUrl && (
              <React.Fragment>
                <Grid>
                  <Grid.Item size={1}><div /></Grid.Item>
                  <Grid.Item size={10}>
                    <Image source={props.logoImageUrl} alternativeText='logo' />
                  </Grid.Item>
                </Grid>
                <Spacing size='wide'/>
              </React.Fragment>
            )}
            <Text mode='header' alignment='center'><Markdown source={props.titleText}/></Text>
            <Spacing size='wide'/>
            <Text alignment='left'><Markdown source={props.subtitleText}/></Text>
            <Spacing size='wide'/>
            <EmailForm>
              <EmailInput placeholder={props.emailPlaceholderText}></EmailInput>
              <Spacing size='narrow'/>
              <Button
                mode='primary'
                isFullWidth={true}
                text={props.emailButtonText}
                onClicked={onEmailSubmitClicked}
              />
              {props.emailSubtitleText && (
                <React.Fragment>
                  <Spacing size='wide'/>
                  <Text><Markdown source={props.emailSubtitleText} /></Text>
                </React.Fragment>
              )}
            </EmailForm>
            <Spacing size='extra-extra-wide'/>
          </Section>
        </Grid.Item>
      </Grid>
    </Container>
  );
};
