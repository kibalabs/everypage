import React from 'react';
import styled from 'styled-components';


interface IIconProps {
  size?: 'default' | 'small' | 'large' | 'extra-large' | 'full';
  _color?: string;
  iconId: string;
}

interface IIoniconProps extends IIconProps {
}

interface IStyledIoniconProps {
  size: 'default' | 'small' | 'large' | 'extra-large' | 'full';
  color?: string;
}

const getSize = (size: string): string => {
  switch (size) {
    case 'small': {
      return '0.75em';
    }
    case 'large': {
      return '2em';
    }
    case 'extra-large': {
      return '4em';
    }
    case 'full': {
      return '100%';
    }
    default: {
      return '1.3em';
    }
  }
}

const StyledIonicon = styled.div<IStyledIoniconProps>`
  width: ${(props: IStyledIoniconProps): string => getSize(props.size)};
  height: ${(props: IStyledIoniconProps): string => getSize(props.size)};
  color: ${(props: IStyledIoniconProps): string => props.color ? props.color : 'currentColor'};

  svg {
    height: 100%;
    width: 100%;
    fill: currentColor;
    stroke: currentColor;
  }
`;

export const Ionicon = (props: IIoniconProps): React.ReactElement => {
  const [svgContent, setSvgContent] = React.useState<string | null>(null);

  const getIconUrl = (iconId: string): string | null => {
    if (iconId.startsWith('ion-')) {
      const iconName = iconId.replace('ion-', '', 1);
      return `https://assets.evrpg.com/ionicons/v5/${iconName}.svg`;
    }
    return null;
  }

  React.useEffect(() => {
    fetch(getIconUrl(props.iconId))
      .then(result => result.text())
      .then(resultText => setSvgContent(resultText.replaceAll('stroke:#000', 'stroke:currentColor').replaceAll('fill:#000', 'stroke:currentColor')))
      .catch(() => setSvgContent(null));
  }, [props.iconId]);

  return (
    <StyledIonicon
      size={props.size}
      color={props._color}
      dangerouslySetInnerHTML={{__html: svgContent}}
      alt={props.iconId}
    />
  );
};

Ionicon.defaultProps = {
  contentOriginX: 0,
  contentOriginY: 0,
};
