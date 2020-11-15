import React, { FC, useEffect, useState } from 'react';
import { TalentItem } from './talent';
import { TalentPathProvider, useTalentPathContext } from './new-path-context';
import { Talent } from './talent';
import './styles/paths.scss';

export interface Path {
  items: TalentItem[];
  name: string;
}

export const Paths: FC = () => {
  const [paths, setPaths] = useState<Path[]>();

  useEffect(() => {
    fetch('/api/talent-paths').then(async response => {
      return await response.json();
    }).then(async data => {
      setPaths(await data);
    });
  }, []);

  return (
    <div className="talent-path-container">
      {paths && paths.map((p) => {
        return (
          <div className="talent-path" key={p.name}>
            <div className="scroll-label">(Swipe to see more talents)</div>
            <div className="path-label">{p.name}</div>
            <TalentPathProvider data={p.items}>
              <TalentPath />
            </TalentPathProvider>
          </div>
        );[]
      })}
    </div>
  );
}

const TalentPath: FC = () => {
  const { state } = useTalentPathContext();
  return (
    <div className="path">
      {state.map((talent, index, talents) => {
        return (
          <Talent 
            talentItem={talent}
            index={index} 
            last={index === talents.length - 1} 
            key={index} />
        );
      })}
    </div>
  );
}
