export interface IComponentProps<Theme> {
  id?: string;
  className: string;
  theme?: Theme;
  mode: string;
}

export const defaultComponentProps = {
  className: '',
  mode: 'default',
};
