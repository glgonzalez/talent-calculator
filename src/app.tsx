import React from 'react';
import { pathData, Path } from './data';
import { Paths, Points, PointsProvider } from './components';
import './app.scss';

export const useGetPaths = (): Path[]  => {
  return pathData;
}

export const App = () => {
  return (
    <PointsProvider>
      <div className="app-container">
        <div className="talent-calculator-container">
          <h2 className="title">TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h2>
          <div className="container">
            <Paths />
            <Points />
          </div>
        </div>
      </div>
    </PointsProvider>
  );
}