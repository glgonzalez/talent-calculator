import React, { FC, MouseEvent } from 'react';
import { Talents, NewTalentIcon } from '../../images';
import { useTouchEventHanler } from '../../touch-event-handler';
import { usePointsContext } from '../points';
import { ActionTypes } from './path-context';
import { TalentType, useTalentPathContext } from './new-path-context';
import './styles/talent.scss';

export interface TalentItem {
  id: string,
  name: Talents;
  value: number;
  path: string;
}
 
  //////////////////////////////////////////
 // Component for each individual talent //
//////////////////////////////////////////

export const Talent: FC<{
  talentItem: TalentType; 
  last: boolean;
  index: number;
}> = ({ talentItem, last, index }) => {
  const { state, dispatch } = useTalentPathContext();
  const { spent, total, setSpent } = usePointsContext();
  const { isTouchEvent } = useTouchEventHanler();

  const getPotentialPoints = (talents: TalentType[], idx: number, action: ActionTypes) => {
    let points = 0;
    talents.forEach((talent, talentIndex) => {
      switch(action) {
        case ActionTypes.ADD:
          if(!talent.selected && talentIndex <= idx) {
            points+= talent.value;
          }
          break;
        case ActionTypes.REMOVE:
          if(talent.selected && talentIndex >= idx) {
            points += talent.value;
          }
          break;
        default:
          break;
      }
    });
    return points;
  }

  const add = () => {
    const pointsToSpend = spent + getPotentialPoints(state, index, ActionTypes.ADD);
    if(spent < total && !talentItem.selected && pointsToSpend <= total) {
      setSpent(pointsToSpend);
      dispatch({
        type: ActionTypes.ADD,
        payload: {
          index
        }
      });
    }
  };

  const remove = () => {
    const pointsToRemove = spent - getPotentialPoints(state, index, ActionTypes.REMOVE);
    if(spent > 0 && talentItem.selected && pointsToRemove >= 0) {
      setSpent(pointsToRemove);
      dispatch({
        type: ActionTypes.REMOVE,
        payload: {
          index
        }
      });
    }
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    switch(event.button) {
      case 0:
        if(talentItem.selected && isTouchEvent) {
          remove();
          break;
        }
        add();
        break;
      case 2:
        remove();
        break;
      default:
        break;
    }
  }

  return (
    <div className="talent-container">
      <div className={`gradient ${talentItem.selected ? 'selected' : ''}`}>
        <button 
          className={`talent ${talentItem.selected ? 'selected' : ''}`}
          onClick={handleClick}
          onContextMenu={handleClick}
        >
          <NewTalentIcon type={talentItem.name} notAllowed={spent === total} selected={talentItem.selected} />
        </button>
      </div>
      <div className={`divider${last ? ' last': ''}${talentItem.selected ? ' selected' : ''}`}/>
    </div>
  );
}