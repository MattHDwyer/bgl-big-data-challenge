import { Link, Card, Typography } from '@mui/material';
import React from 'react';
import { Frame } from '../Frame';

import './App.css';

export interface AppProps {}

export const App = ({}: AppProps) => {
  return (
    <Frame>
      <div className="dashboard__container">
        <Typography component={'h1'}>ABHT Competitions</Typography>
        <div className="content__container">Yeeting</div>
      </div>
    </Frame>
  );
};
