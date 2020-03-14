import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';



interface HeroSignup1Props {
  logoImageUrl?: string;
  title?: string;
  subtitle?: string;
  emailPlaceholder?: string;
  emailSubtitle?: string;
}

const Section = styled.nav`
`;

const Image = styled.nav`
`;

const Title = styled.nav`
`;

const Subtitle = styled.nav`
`;

const EmailForm = styled.nav`
`;

const EmailInput = styled.nav`
`;

const EmailSubtitle = styled.nav`
`;

export const HeroSignup1 = (props: HeroSignup1Props): React.ReactElement => (
  <Section>
    <Image>{ props.logoImageUrl && <img src={props.logoImageUrl} /> }</Image>
    <Title><Markdown source={props.title} /></Title>
    <Subtitle><Markdown source={props.subtitle} /></Subtitle>
    <EmailForm>
      <EmailInput></EmailInput>
      {props.emailSubtitle && (
        <EmailSubtitle><Markdown source={props.emailSubtitle} /></EmailSubtitle>
      )}
    </EmailForm>
  </Section>
);
