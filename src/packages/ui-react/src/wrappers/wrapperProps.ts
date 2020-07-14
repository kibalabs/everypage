import { ISingleAnyChildProps } from '@kibalabs/core-react';

export interface IWrapperProps extends ISingleAnyChildProps {
  className: string;
}

export const defaultWrapperProps = {
  className: '',
};
