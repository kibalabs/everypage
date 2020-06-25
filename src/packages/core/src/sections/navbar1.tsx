import React from 'react';
import styled from 'styled-components';

import { Section, ISectionProps } from '.';
import { Stack, Direction, Image, Markdown, TextAlignment, useDimensions, Alignment, IDimensionGuide, Button, KibaIcon, IconButton, Spacing, SpacingSize, ResponsiveView } from '@kibalabs/ui-react';

interface IStyledNavigationBarProps {
  theme: IDimensionGuide;
}

// TODO(krish): this should use a box or something, not use theme directly!
const StyledNavigationBar = styled.nav<IStyledNavigationBarProps>`
  height: 4em;
  padding: ${(props: IStyledNavigationBarProps): string => props.theme.padding};
  transition: 0.3s;
  width: 100%;
`;

interface INavBar1Button {
  text: string;
  target: string;
  mode?: string;
  display?: 'always' | 'overflow' | 'default';
}
interface INavBar1Props extends ISectionProps {
  logoImageUrl?: string;
  titleText?: string;
  buttons?: INavBar1Button[];
}

export const NavBar1 = (props: INavBar1Props): React.ReactElement => {
  const theme = useDimensions();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const onMenuClicked = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Section {...props as ISectionProps}>
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
        <StyledNavigationBar theme={theme}>
          <ResponsiveView show={false} showLarge={true} isFullHeight={true} isFullWidth={true}>
            <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true} shouldAddGutters={true}>
              {props.logoImageUrl && <Stack.Item shrinkFactor={1} isFullHeight={true}><Image source={props.logoImageUrl} isFullHeight={true} alternativeText='logo' /></Stack.Item>}
              {props.titleText && <Markdown rootTextMode='title-nomargin' rootTextAlignment={TextAlignment.Center} source={props.titleText}/> }
              <Stack.Item growthFactor={1} />
              {props.buttons && props.buttons.map((button: INavBar1Button, index: number): React.ReactElement => {
                return !button.display || button.display === 'default' || button.display === 'always' ? (
                  <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
                ) : null;
              })}
            </Stack>
          </ResponsiveView>
          <ResponsiveView show={true} showLarge={false} isFullHeight={true} isFullWidth={true}>
            <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true} shouldAddGutters={true}>
              {props.logoImageUrl && <Stack.Item shrinkFactor={1} isFullHeight={true}><Image source={props.logoImageUrl} isFullHeight={true} alternativeText='logo' /></Stack.Item>}
              {props.titleText && <Markdown rootTextMode='title-nomargin' rootTextAlignment={TextAlignment.Center} source={props.titleText}/> }
              <Stack.Item growthFactor={1} />
              {props.buttons && props.buttons.map((button: INavBar1Button, index: number): React.ReactElement => {
                return button.display === 'always' ? (
                  <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
                ) : null;
              })}
              <IconButton icon={<KibaIcon iconId='ion-menu-outline'/>} onClicked={onMenuClicked} />
            </Stack>
          </ResponsiveView>
        </StyledNavigationBar>
        <ResponsiveView show={isMenuOpen} showLarge={false} isFullHeight={true} isFullWidth={true}>
          <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true} childAlignment={Alignment.Center} shouldAddGutters={true}>
            <Spacing mode={SpacingSize.ExtraWide}/>
            {props.buttons && props.buttons.map((button: INavBar1Button, index: number): React.ReactElement => {
              return !button.display || button.display === 'default' || button.display === 'overflow' ? (
                <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
              ) : null;
            })}
            <Spacing mode={SpacingSize.ExtraWide}/>
          </Stack>
        </ResponsiveView>
      </Stack>
    </Section>
  );
};
NavBar1.displayName = 'navbar-1';
