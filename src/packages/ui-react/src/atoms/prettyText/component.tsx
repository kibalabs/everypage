import React from 'react';
import styled from 'styled-components';
import { getClassName } from '@kibalabs/core';
import { IMultiAnyChildProps } from '@kibalabs/core-react';

import { IComponentProps, defaultComponentProps } from '../../model';
import { themeToCss } from '../../util';
import { useBuiltTheme } from '../../theming';
import { TextAlignment, getTextTag, TextTag } from '../../subatoms/text';
import { IPrettyTextTheme } from './theme';

interface IStyledPrettyTextProps {
  theme: IPrettyTextTheme;
  alignment?: TextAlignment;
}

const StyledPrettyText = styled.span<IStyledPrettyTextProps>`
  ${(props: IStyledPrettyTextProps): string => themeToCss(props.theme.normal.default.text)};
  ${(props: IStyledPrettyTextProps): string => props.alignment ? `text-align: ${props.alignment}`: ''};
  & > em {
    display: inline-block;
    ${(props: IStyledPrettyTextProps): string => themeToCss(props.theme.normal.emphasis?.text)};
  }
  & > strong {
    display: inline-block;
    ${(props: IStyledPrettyTextProps): string => themeToCss(props.theme.normal.strong?.text)};
  }
`;

interface IPrettyTextProps extends IComponentProps<IPrettyTextTheme>, IMultiAnyChildProps {
  alignment?: TextAlignment;
  tag?: TextTag;
}

export const PrettyText = (props: IPrettyTextProps): React.ReactElement => {
  const theme = useBuiltTheme('prettyTexts', props.variant, props.theme);
  return (
    <StyledPrettyText
      id={props.id}
      className={getClassName(PrettyText.displayName, props.className)}
      theme={theme}
      alignment={props.alignment}
      as={props.tag || getTextTag(props.variant)}
    >
      { props.children }
    </StyledPrettyText>
  );
};

PrettyText.defaultProps = {
  ...defaultComponentProps,
};
PrettyText.displayName = 'pretty-text';
