import { buildTheme } from "@kibalabs/ui-react";

const defaultTheme = buildTheme();
export const consoleTheme = buildTheme({
  colors: {
    brandPrimary: '#4b6cb7',
    brandSecondary: '#182848',
    banner: '#ffdd7e',
    background: '#f5f5f5',
  },
  alternateColors: {
    branded: {
      background: '#4b6cb7',
      brandPrimary: '#ffffff',
    },
  },
  buttons: {
    default: {
      normal: {
        default: {
          background: {
            padding: `${defaultTheme.dimensions.paddingNarrow} ${defaultTheme.dimensions.paddingWide}`,
          },
          text: {
            'font-weight': 'normal',
          },
        },
      },
    },
    padded: {
      normal: {
        default: {
          background: {
            padding: `${defaultTheme.dimensions.padding} ${defaultTheme.dimensions.paddingWide}`,
          },
        },
      },
    },
    destructive: {
      normal: {
        default: {
          text: {
            color: '$colors.error',
          },
        },
        hover: {
          background: {
            'background-color': '$colors.errorClear90',
          },
        },
        press: {
          background: {
            'background-color': '$colors.errorClear80',
          },
        },
      },
    },
  },
  inputWrappers: {
    stripeField: {
      normal: {
        default: {
          background: {
            padding: `${defaultTheme.dimensions.paddingWide} ${defaultTheme.dimensions.paddingWide}`,
          },
        },
      },
    },
  },
  texts: {
    default: {
      'font-size': '16px',
      'font-family': 'Montserrat, sans-serif',
    },
    light: {
      color: '$colors.textLight25',
    },
    error: {
      color: '$colors.error',
    },
    selectItemText: {
      'font-size': '0.875rem',
    },
    singleLine: {
      'white-space': 'pre',
    },
  },
  boxes: {
    banner: {
      'background-color': 'white',
      padding: `${defaultTheme.dimensions.padding} ${defaultTheme.dimensions.paddingWide}`,
      'border-width': '1px',
      'border-color': '$colors.backgroundDark25',
      'border-radius': '0',
    },
    unpadded: {
      padding: '0px',
    },
  },
});
