import React from 'react';

import { Icon } from './component';

interface IIconProps {
  size?: 'default' | 'small' | 'large' | 'extra-large' | 'full';
  _color?: string;
  iconId: string;
}

interface IKibaIconProps extends IIconProps {
}

interface IconData {
  url: string;
  shouldAddFill: boolean;
  shouldAddStroke: boolean;
}

export const KibaIcon = (props: IKibaIconProps): React.ReactElement => {
  const [svgContent, setSvgContent] = React.useState<string | null>(null);
  const [shouldAddFill, setShouldAddFill] = React.useState<boolean | undefined>(undefined);
  const [shouldAddStroke, setShouldAddStroke] = React.useState<boolean | undefined>(undefined);

  const getIconData = (iconId: string): IconData | null => {
    if (iconId.startsWith('ion-')) {
      return {
        url: `https://assets.evrpg.com/ionicons/v5/${iconId.replace('ion-', '')}.svg`,
        shouldAddFill: true,
        shouldAddStroke: false,
      }
    }
    if (iconId.startsWith('feather-')) {
      return {
        url: `https://assets.evrpg.com/feather/v4/${iconId.replace('feather-', '')}.svg`,
        shouldAddFill: false,
        shouldAddStroke: true,
      }
    }
    if (iconId.startsWith('remix-')) {
      return {
        url: `https://assets.evrpg.com/remixicons/v2/${iconId.replace('remix-', '')}.svg`,
        shouldAddFill: true,
        shouldAddStroke: false,
      }
    }
    return null;
  }

  React.useEffect(() => {
    setSvgContent(undefined);
    const iconData = getIconData(props.iconId);
    if (!iconData) {
      console.log(`Failed to identify icon type from iconId: ${props.iconId}`);
      return;
    }
    setShouldAddFill(iconData.shouldAddFill);
    setShouldAddStroke(iconData.shouldAddStroke);
    fetch(iconData.url)
      .then(result => result.text())
      .then(resultText => setSvgContent(resultText.replace(/<title>.*<\/title>/gi, '').replace(/stroke:#000/gi, 'stroke:currentColor').replace(/fill:#000/gi, 'fill:currentColor')))
      .catch(() => setSvgContent(null));
  }, [props.iconId]);

  return (
    <Icon
      size={props.size}
      _color={props._color}
      shouldAddFill={shouldAddFill}
      shouldAddStroke={shouldAddStroke}
      svgContent={svgContent}
    />
  );
};

KibaIcon.defaultProps = {
};
