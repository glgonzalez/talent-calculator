import React, { FC, MouseEvent } from 'react';
import { TalentItem } from '../../data';
import { Talents, NewTalentIcon } from '../../images';
import { usePointsContext } from '../points';
import { usePathContext, ActionTypes } from './path-context';
import './styles/talent.scss';

  //////////////////////
 // Helper functions //
//////////////////////

const getPoints = (index: number, action: ActionTypes, arr: TalentItem[]) => {
  let points = 0;
  let newArr = [];
  if(action === ActionTypes.ADD) {
    newArr = [...arr.slice(0, index)];
  } else {
    newArr = [...arr.slice(index, arr.length)]
  }
  newArr.forEach(n => points += n.value);
  return points;
}

const getIndex = (tal: TalentItem[], rem: TalentItem[], currentIndex: number) => {
  let newIndex = currentIndex;
  rem.forEach((r, i) => {
    if(r.name === tal[currentIndex].name) {
      newIndex = i;
    }
  });
  return newIndex;
}
 
  //////////////////////////////////////////
 // Component for each individual talent //
//////////////////////////////////////////

export const Talent: FC<{
  talentItem: TalentItem; 
  last: boolean;
  index: number;
  talents: TalentItem[];
}> = ({ talentItem, last, index, talents }) => {
  const { state, dispatch } = usePathContext();
  const { spent, total, setSpent } = usePointsContext();

  // Determine if the talent is selected
  const isSelected = (itemName: Talents) => {
    return state.selected.some(s => s.name === itemName);
  }

  const add = () => {
    const newIndex = getIndex(talents, state.remaining, index) + 1;
    const points = spent + getPoints(newIndex, ActionTypes.ADD, state.remaining);
    if(spent < total && points <= total) {
      if(!isSelected(talentItem.name)) {
        setSpent(points);
        dispatch({
          type: ActionTypes.ADD,
          payload: {index: getIndex(talents, state.remaining, index) }
        });
      }
    }
  }

  const remove = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const points = spent - getPoints(index, ActionTypes.REMOVE, state.selected);
    if(spent > 0 && points >= 0) {
      if(isSelected(talentItem.name)) {
        setSpent(points);
        dispatch({
          type: ActionTypes.REMOVE,
          payload: {index}
        });
      }
    }
  }

  return (
    <div className="talent-container">
      <div className={`gradient ${isSelected(talentItem.name) ? 'selected' : ''}`}>
        <button 
          className={`talent ${isSelected(talentItem.name) ? 'selected' : ''}`}
          onClick={add}
          onContextMenu={remove}>
          <NewTalentIcon type={talentItem.name} notAllowed={spent === total} selected={isSelected(talentItem.name)} />
        </button>
      </div>
      <div className={`divider${last ? ' last': ''}${isSelected(talentItem.name) ? ' selected' : ''}`}/>
    </div>
  );
}