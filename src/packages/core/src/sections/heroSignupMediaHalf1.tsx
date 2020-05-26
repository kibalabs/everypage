import React from 'react';

import { Section, ISectionProps } from '.';
import { Form, Grid, Image, Media, Button, MarkdownText, Spacing, SpacingSize, TextAlignment, Stack, SingleLineInput, Direction, InputType, Alignment } from '../components';
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

  if (props.leftMediaUrl && props.rightMediaUrl) {
    throw new Error('Only one of {leftMediaUrl, rightMediaUrl} should be provided to hero-signup-media-half-1')
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
      // setSuccessMessage(props.inputSuccessMessageText)
    } else {
      setErrorMessage(result.responseMessage);
    }
  };

  return (
    <Section {...props as ISectionProps}>
      <Stack direction={Direction.Vertical}>
        <Spacing mode={SpacingSize.ExtraExtraExtraWide}/>
        <Grid>
          { props.leftMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          { props.leftMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          <Grid.Item size={1}><div /></Grid.Item>
          <Grid.Item size={10} sizeMedium={5}>
            <Stack direction={Direction.Vertical}>
              { props.logoImageUrl && (
                <React.Fragment>
                  <Grid>
                    <Grid.Item size={1}><div /></Grid.Item>
                    <Grid.Item size={10}>
                      <Image source={props.logoImageUrl} isLazyLoadable={false} alternativeText='logo' />
                    </Grid.Item>
                  </Grid>
                  <Spacing mode={SpacingSize.ExtraExtraWide} />
                </React.Fragment>
              )}
              <MarkdownText mode='header' alignment={TextAlignment.Left} text={props.titleText}/>
              <Spacing mode={SpacingSize.ExtraWide} />
              {props.subtitleText && <MarkdownText alignment={TextAlignment.Left} text={props.subtitleText}/>}
              <Spacing mode={SpacingSize.ExtraWide} />
              <Form onFormSubmitted={onFormSubmitted}>
                <Grid>
                  <Grid.Item size={0} sizeSmall={12}>
                    <Stack direction={Direction.Horizontal}>
                      <Stack.Item growthFactor={1}>
                        <SingleLineInput
                          inputType={props.inputType}
                          name={props.inputName}
                          placeholderText={props.inputPlaceholderText}
                          value={input}
                          onValueChanged={setInput}
                          errorText={errorMessage}
                        />
                      </Stack.Item>
                      <Spacing direction={Direction.Horizontal} mode={SpacingSize.Default}/>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        text={props.inputButtonText}
                        isLoading={isLoading}
                      />
                    </Stack>
                  </Grid.Item>
                  <Grid.Item size={12} sizeSmall={0}>
                    <Stack direction={Direction.Vertical}>
                      <SingleLineInput
                        inputType={props.inputType}
                        name={props.inputName}
                        placeholderText={props.inputPlaceholderText}
                        value={input}
                        onValueChanged={setInput}
                        errorText={errorMessage}
                      />
                      <Spacing direction={Direction.Vertical} mode={SpacingSize.Default}/>
                      <Button
                        mode='primary'
                        buttonType='submit'
                        isFullWidth={true}
                        text={props.inputButtonText}
                      />
                    </Stack>
                  </Grid.Item>
                </Grid>
              </Form>
              <Spacing mode={SpacingSize.ExtraExtraWide}/>
            </Stack>
          </Grid.Item>
          <Grid.Item size={1}><div /></Grid.Item>
          { props.rightMediaUrl && (
            <Grid.Item size={0} sizeMedium={4}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (<Grid.Item size={0} sizeMedium={1}><div /></Grid.Item>) }
          <Grid.Item size={2} sizeMedium={0}><div /></Grid.Item>
          { props.leftMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.leftMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
          { props.rightMediaUrl && (
            <Grid.Item size={8} sizeMedium={0}>
              <Media source={props.rightMediaUrl} isLazyLoadable={false} alternativeText={'hero-media'} />
            </Grid.Item>
          )}
        </Grid>
        <Spacing mode={SpacingSize.ExtraExtraWide}/>
      </Stack>
    </Section>
  );
};
HeroSignupMediaHalf1.displayName = 'hero-signup-media-half-1';
HeroSignupMediaHalf1.defaultProps = {
  ...defaultFormProps,
};
