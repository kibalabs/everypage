import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';

import { Container, Grid } from 'components/layout';
import { Image } from 'components/image';


interface HeroSignup1Props {
  logoImageUrl?: string;
  title?: string;
  subtitle?: string;
  emailPlaceholder?: string;
  emailSubtitle?: string;
}

const Section = styled.nav`
`;

const Header = styled.h1`
  font-size: 2.5em;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  color: #222222;
  line-height: 1.2em;
`;

const Text = styled.span`
  font-size: 1em;
  font-family: 'Montserrat', sans-serif;
  font-weight: normal;
  color: #777777;
  line-height: 1.2em;
`;

const EmailForm = styled.nav`
`;

const EmailInput = styled.nav`
`;

export const HeroSignup1 = (props: HeroSignup1Props): React.ReactElement => (
  <Container>
    <Grid shouldShowGutters={false}>
      <Grid.Item sizeSmall={1} sizeMedium={2} sizeLarge={3}><div></div></Grid.Item>
      <Grid.Item sizeSmall={10} sizeMedium={8} sizeLarge={6}>
        <Section>
          { props.logoImageUrl && <Image source={props.logoImageUrl} alternativeText='logo' /> }
          <Header><Markdown source={props.title} /></Header>
          <Text><Markdown source={props.subtitle} /></Text>
          <EmailForm>
            <EmailInput></EmailInput>
            {props.emailSubtitle && (
              <Text><Markdown source={props.emailSubtitle} /></Text>
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
