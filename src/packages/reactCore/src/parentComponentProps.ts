import React from 'react';

export interface ISingleChildProps<PropsType> {
  children: React.ReactElement<PropsType>;
}

export interface IMultiChildProps<PropsType> {
  children?: React.ReactElement<PropsType> | React.ReactElement<PropsType>[];
}

export interface ISingleAnyChildProps {
  children: React.ReactChild;
}

export interface IMultiAnyChildProps {
  children?: React.ReactChild | React.ReactChild[];
}
