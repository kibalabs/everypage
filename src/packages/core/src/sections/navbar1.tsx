import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { Stack, Direction, Image, Markdown, TextAlignment, useDimensions, Alignment, IDimensionGuide, Button, KibaIcon, IconButton, Spacing, PaddingSize, ResponsiveView, ScreenSize, HidingView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';

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
    <Section {...props as ISectionProps} className={getClassName(NavBar1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} isFullHeight={true} isFullWidth={true}>
        <StyledNavigationBar theme={theme}>
          <Stack direction={Direction.Horizontal} isFullHeight={true} isFullWidth={true} shouldAddGutters={true} childAlignment={Alignment.Center}>
            {props.logoImageUrl && <Stack.Item shrinkFactor={1} isFullHeight={true}><Image isLazyLoadable={false} source={props.logoImageUrl} isFullHeight={true} alternativeText='logo' /></Stack.Item>}
            {props.titleText && <Markdown rootTextMode='title-nomargin' rootTextAlignment={TextAlignment.Center} source={props.titleText}/> }
            <Stack.Item growthFactor={1} />
            {props.buttons && props.buttons.map((button: INavBar1Button, index: number): React.ReactElement => {
              if (button.display === 'always') {
                return <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />;
              }
              return (!button.display || button.display === 'default') && (
                <ResponsiveView key={index} hiddenBelow={ScreenSize.Large}>
                  <Button text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
                </ResponsiveView>
              );
            })}
            {props.buttons && props.buttons.filter((button: INavBar1Button): boolean => (!button.display || button.display === 'default' || button.display === 'overflow')).length > 0 && (
              <ResponsiveView hiddenAbove={ScreenSize.Large}>
                <IconButton icon={<KibaIcon iconId='ion-menu-outline'/>} onClicked={onMenuClicked} />
              </ResponsiveView>
            )}
          </Stack>
        </StyledNavigationBar>
        <HidingView isHidden={!isMenuOpen}>
          <ResponsiveView hiddenAbove={ScreenSize.Large}>
            <Stack direction={Direction.Vertical} isFullWidth={true} childAlignment={Alignment.Center} shouldAddGutters={true} gutterSizeStart={PaddingSize.ExtraWide} gutterSizeEnd={PaddingSize.ExtraWide}>
              {props.buttons && props.buttons.map((button: INavBar1Button, index: number): React.ReactElement => {
                return (!button.display || button.display === 'default' || button.display === 'overflow') && (
                  <Button key={index} text={button.text} onClicked={(): void => {window.open(button.target)}} mode={button.mode} />
                );
              })}
            </Stack>
          </ResponsiveView>
        </HidingView>
      </Stack>
    </Section>
  );
};
NavBar1.displayName = 'navbar-1';
