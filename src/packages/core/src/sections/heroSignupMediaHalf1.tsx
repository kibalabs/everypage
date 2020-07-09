import React from 'react';
import { getClassName } from '@kibalabs/core';
import { Form, Grid, Image, Media, Button, Markdown, Spacing, PaddingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Alignment, ScreenSize, ResponsiveView } from '@kibalabs/ui-react';

import { Section, ISectionProps } from '.';
import { submitForm, validateInput } from '../internal';
import { IFormProps, defaultFormProps } from '../model';


// TODO(krish): These have to be optional because components don't declare them specifically. How can it be fixed?
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
    const result = await submitForm([{value: input, type: props.inputType, name: props.inputName}, ...props.formAdditionalInputs], props.formAction, props.formTarget);
    setIsLoading(false);
    if (result.isSuccessful) {
      setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps} className={getClassName(HeroSignupMediaHalf1.displayName, props.className)}>
      <Stack direction={Direction.Vertical} gutterSizeStart={PaddingSize.ExtraExtraExtraWide} gutterSizeEnd={PaddingSize.ExtraExtraExtraWide}>
        <Grid childAlignment={Alignment.Center}>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1} />) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={1} />
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical}>
              { props.logoImageUrl && (
                <React.Fragment>
                  <Grid>
                    <Grid.Item size={1} />
                    <Grid.Item size={10}>
                      <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                    </Grid.Item>
                  </Grid>
                  <Spacing mode={PaddingSize.ExtraExtraWide} />
                </React.Fragment>
              )}
              <Markdown rootTextMode='header' rootTextAlignment={TextAlignment.Left} source={props.titleText}/>
              {props.subtitleText && <Markdown rootTextMode='sectionSubtitle' rootTextAlignment={TextAlignment.Left} source={props.subtitleText}/>}
              <Spacing mode={PaddingSize.ExtraWide} />
              <Form onFormSubmitted={onFormSubmitted}>
                <React.Fragment>
                  <ResponsiveView hiddenBelow={ScreenSize.Small}>
                    <Stack direction={Direction.Horizontal}>
                      <Stack.Item growthFactor={1} gutterSizeAfter={PaddingSize.Default}>
                        <SingleLineInput
                          inputWrapperMode={errorMessage ? 'error' : successMessage ? 'success' : ''}
                          inputType={props.inputType}
                          name={props.inputName}
                          placeholderText={props.inputPlaceholderText}
                          value={input}
                          onValueChanged={onInputValueChanged}
                          messageText={errorMessage || successMessage}
                        />
                      </Stack.Item>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        text={props.inputButtonText}
                        isLoading={isLoading}
                      />
                    </Stack>
                  </ResponsiveView>
                  <ResponsiveView hiddenAbove={ScreenSize.Small}>
                    <Stack direction={Direction.Vertical}>
                      <Stack.Item growthFactor={1} gutterSizeAfter={PaddingSize.Default}>
                        <SingleLineInput
                          inputWrapperMode={errorMessage ? 'error' : successMessage ? 'success' : ''}
                          inputType={props.inputType}
                          name={props.inputName}
                          placeholderText={props.inputPlaceholderText}
                          value={input}
                          onValueChanged={onInputValueChanged}
                          messageText={errorMessage || successMessage}
                        />
                      </Stack.Item>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        text={props.inputButtonText}
                        isLoading={isLoading}
                        isFullWidth={true}
                      />
                    </Stack>
                  </ResponsiveView>
                </React.Fragment>
              </Form>
              <Spacing mode={PaddingSize.ExtraExtraWide}/>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1} />
          { props.rightMediaUrl && (
            <Grid.Item size={0} sizeMedium={4} alignment={Alignment.Center}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item size={0} sizeMedium={1} />) }
          { props.leftMediaUrl && (
            <Grid.Item size={8} sizeMedium={0} alignment={Alignment.Center}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item size={8} sizeMedium={0} alignment={Alignment.Center}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
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
