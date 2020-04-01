import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import { Container, Grid, Image, Button, Text } from '../components';


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

export const HeroSignup1 = (props: IHeroSignup1Props): React.ReactElement => (
  <Container>
    <Grid>
      <Grid.Item size={1} sizeSmall={2} sizeMedium={2} sizeLarge={3}><div /></Grid.Item>
      <Grid.Item size={10} sizeSmall={8} sizeMedium={8} sizeLarge={6}>
        <Section>
          { props.logoImageUrl && (
            <Grid>
              <Grid.Item size={1} sizeLarge={2}><div /></Grid.Item>
              <Grid.Item size={10} sizeLarge={8}>
                <Image source={props.logoImageUrl} alternativeText='logo' />
              </Grid.Item>
            </Grid>
          )}
          <Text mode='header' alignment='center'><Markdown source={props.titleText}/></Text>
          <Text alignment='left'><Markdown source={props.subtitleText}/></Text>
          <EmailForm>
            <EmailInput placeholder={props.emailPlaceholderText}></EmailInput>
            <Button text={props.emailButtonText}></Button>
            {props.emailSubtitleText && (
              <Text><Markdown source={props.emailSubtitleText} /></Text>
            )}
          </EmailForm>
        </Section>
      </Grid.Item>
    </Grid>
  </Container>
);


{/* <section id="welcome-area" class="bg-gray">
  <div class="container">
      <div class="row">
          <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
              <div class="welcome-content newsletter-content">
                  <div class="logo-container">
                      <img class="logo" src="logo-color-white.svg"/>
                  </div>
                  <br/><br/>
                  <h1 class="text-center">Managed documentation for growing developer teams</h1>
                  <br/>
                  <p>We believe developer teams should have well-managed documentation tools and processes from day 1, just like with their coding. We're building the future of developer documentation 🚀</p>
                  <br/>
                  <form name="signup-form" id="signup-form" action="https://wml-api.whitemonkeylabs.com/v1/newsletter-subscriptions" method="POST" accept-charset="utf-8">
                      <input type="text" name="email" class="form-control" placeholder="Sign up to get updates and early access  👀">
                      <input type="hidden" name="subform" value="yes"/>
                      <button type="submit" name="submit" id="submit-btn">Subscribe Now</button>
                      <p id="status"></p>
                  </form>
                  <br/>
                  <p>We're building in the open - you can follow along on <a href="https://www.indiehackers.com/product/kiwidocs">Indie Hackers</a> 🚧.</p>
              </div>
          </div>
      </div>
  </div>
</section> */}
