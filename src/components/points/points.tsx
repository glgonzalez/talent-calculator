import React, { FC } from 'react';
import { usePointsContext } from './points-context';
import './points.scss';

export const Points: FC = () => {
  const {spent, total} = usePointsContext();
  return (
    <div className="points-container">
      <div className="points">
        <div>{`${spent} / ${total}`}</div>
        <div className="points-label">Points Spent</div>
      </div>
    </div>
  )
}