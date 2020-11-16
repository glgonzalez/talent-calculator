import React, { Suspense } from 'react';
import { Paths, Points, PointsProvider } from './components';
import { TouchEventHandlerProvider} from './touch-event-handler';
import './app.scss';

export const App = () => {
  return (
    <TouchEventHandlerProvider>
      <PointsProvider>
        <div className="app-container">
          <div className="talent-calculator">
            <h2 className="title">TitanStar Legends - Rune Mastery Loadout Talent Calculator 9000</h2>
            <div className="container">
              <Suspense fallback={() => <h1 className="loading">Loading...</h1>}>
                <Paths />
              </Suspense>
              <Points />
            </div>
          </div>
        </div>
      </PointsProvider>
    </TouchEventHandlerProvider>
  );
}

