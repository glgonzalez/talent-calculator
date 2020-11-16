import React, { FC } from 'react';
import { usePointsContext } from './points-context';
import './points.scss';

export const Points: FC = () => {
  const {spent, total, error} = usePointsContext();
  return (
    <div className="points-container">
      <div className="points">
        <div>{`${spent} / ${total}`}</div>
        <div className="points-label">Points Spent</div>
        {error ? <div className="error">{error}</div> : null}
      </div>
    </div>
  )
}