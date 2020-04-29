export interface IMoleculeProps<Theme> {
  id?: string;
  className: string;
  theme?: Theme;
}

export const defaultMoleculeProps = {
  className: '',
};
