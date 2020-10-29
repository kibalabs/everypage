import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Form, Grid, Image, Media, Button, ResponsiveTextAlignmentView, PaddingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Alignment, ScreenSize, ResponsiveHidingView, ResponsiveContainingView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { submitForm, validateInput, EverypagePaddingSize } from '../internal';
import { IFormProps, defaultFormProps } from '../model';
import { HeroSectionTitleText, SectionSubtitleText } from '../components';


// TODO(krishan711): These have to be optional because components don't declare them specifically. How can it be fixed?
interface IHeroSignupMediaHalf1Props extends ISectionProps, IFormProps {
  logoImageUrl?: string;
  titleText?: string;
  subtitleText?: string;
  inputPlaceholderText?: string;
  inputButtonText?: string;
  inputSuccessMessageText?: string;
  inputType?: InputType;
  inputName?: string;
  leftMediaUrl?: string;
  rightMediaUrl?: string;
}

export const HeroSignupMediaHalf1 = (props: IHeroSignupMediaHalf1Props): React.ReactElement => {
  const [input, setInput] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const onInputValueChanged = (value: string): void => {
    setInput(value);
    setErrorMessage(null);
    setSuccessMessage(null);
  }

  const onFormSubmitted = async (): Promise<void> => {
    const validationResult = validateInput(input, props.inputType);
    if (!validationResult.isValid) {
      setErrorMessage(validationResult.errorMessage);
      return;
    }
    setIsLoading(true);
    setErrorMessage(null);
    const result = await submitForm([{value: input, type: props.inputType, name: props.inputName}, ...props.formAdditionalInputs], props.formAction, props.formTarget, props.formHeaders);
    setIsLoading(false);
    if (result.isSuccessful) {
      setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSignupMediaHalf1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} paddingStart={EverypagePaddingSize.HeroTop} paddingEnd={EverypagePaddingSize.HeroBottom}>
        <Grid childAlignment={Alignment.Center}>
        { props.leftMediaUrl && (<Grid.Item sizeResponsive={{base: 0, medium: 1}} />) }
          { props.leftMediaUrl && (
            <Grid.Item sizeResponsive={{base: 0, medium: 4}}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item sizeResponsive={{base: 2, medium: 1}} />
          <Grid.Item sizeResponsive={{base: 8, medium: 5}}>
            <ResponsiveTextAlignmentView alignment={TextAlignment.Center} alignmentResponsive={{medium: TextAlignment.Left}}>
                <Stack direction={Direction.Vertical} paddingEnd={PaddingSize.Wide3} contentAlignmentResponsive={{base: Alignment.Center, medium: Alignment.Start}}>
                {props.logoImageUrl && <Stack.Item gutterAfter={PaddingSize.Wide2}><ResponsiveContainingView sizeResponsive={{base: 12, medium: 10}}><Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' /></ResponsiveContainingView></Stack.Item>}
                {props.titleText && <Stack.Item gutterAfter={props.subtitleText ? PaddingSize.Wide : PaddingSize.Wide2}><HeroSectionTitleText text={props.titleText}/></Stack.Item>}
                {props.subtitleText && <Stack.Item gutterAfter={PaddingSize.Wide2}><SectionSubtitleText text={props.subtitleText}/></Stack.Item>}
                <Form onFormSubmitted={onFormSubmitted}>
                  <React.Fragment>
                    <ResponsiveHidingView hiddenBelow={ScreenSize.Small}>
                      <Stack direction={Direction.Horizontal}>
                        <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                          <SingleLineInput
                            inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                            inputType={props.inputType}
                            name={props.inputName}
                            placeholderText={props.inputPlaceholderText}
                            value={input}
                            onValueChanged={onInputValueChanged}
                            messageText={errorMessage || successMessage}
                          />
                        </Stack.Item>
                        <Button
                          variant='primary'
                          buttonType='submit'
                          text={props.inputButtonText}
                          isLoading={isLoading}
                        />
                      </Stack>
                    </ResponsiveHidingView>
                    <ResponsiveHidingView hiddenAbove={ScreenSize.Small}>
                      <Stack direction={Direction.Vertical}>
                        <Stack.Item growthFactor={1} gutterAfter={PaddingSize.Default}>
                          <SingleLineInput
                            inputWrapperVariant={errorMessage ? 'error' : successMessage ? 'success' : ''}
                            inputType={props.inputType}
                            name={props.inputName}
                            placeholderText={props.inputPlaceholderText}
                            value={input}
                            onValueChanged={onInputValueChanged}
                            messageText={errorMessage || successMessage}
                          />
                        </Stack.Item>
                        <Button
                          variant='primary'
                          buttonType='submit'
                          text={props.inputButtonText}
                          isLoading={isLoading}
                          isFullWidth={true}
                        />
                      </Stack>
                    </ResponsiveHidingView>
                  </React.Fragment>
                </Form>
              </Stack>
            </ResponsiveTextAlignmentView>
          </Grid.Item>
          <Grid.Item sizeResponsive={{base: 2, medium: 1}} />
          { props.rightMediaUrl && (
            <Grid.Item sizeResponsive={{base: 0, medium: 4}}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item sizeResponsive={{base: 0, medium: 1}} />) }
          { props.leftMediaUrl && (
            <Grid.Item sizeResponsive={{base: 8, medium: 0}}>
              <Media isCenteredHorizontally={true} source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item sizeResponsive={{base: 8, medium: 0}}>
              <Media isCenteredHorizontally={true} source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
        </Grid>
      </Stack>
    </Section>
  );
};
HeroSignupMediaHalf1.displayName = 'hero-signup-media-half-1';
HeroSignupMediaHalf1.defaultProps = {
  ...defaultFormProps,
};
