import React, { ReactElement } from 'react';

import './Frame.css';

export interface FrameProps {
  children: React.ReactNode;
}

export const Frame = ({ children }: FrameProps) => {
  return <div className="frame__container">{children}</div>;
};
