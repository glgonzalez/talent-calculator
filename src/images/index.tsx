import React, { FC } from 'react';
import './talent-icons.scss';

export type Talents = 
  'chevrons' 
  | 'silverware' 
  | 'cake' 
  | 'crown' 
  | 'boat' 
  | 'snorkle' 
  | 'lightning' 
  | 'skull';

export const NewTalentIcon: FC<{type: Talents; notAllowed: boolean; selected: boolean}> = ({type, notAllowed, selected }) => {
  return <div className={`talent-icon ${type} ${notAllowed && !selected ? 'not-allowed' : ''} ${selected ? 'selected' : ''}`} />;
}