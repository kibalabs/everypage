export interface IComponentProps<Theme> {
  id?: string;
  className: string;
  theme?: Theme;
  variant?: string;
}

export const defaultComponentProps = {
  className: '',
  variant: 'default',
};
