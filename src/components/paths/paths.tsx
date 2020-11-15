import React, { FC, useEffect, useState } from 'react';
import { TalentItem } from '../../data';
import { PathProvider } from './path-context';
import { Talent } from './talent';
import './styles/paths.scss';

interface PathProps {
  talents: TalentItem[]
}

interface Path {
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

        const contextData = {
          selected: [],
          remaining: p.items
        };

        return (
          <div className="talent-path" key={p.name}>
            <div className="scroll-label">(Swipe to see more talents)</div>
            <div className="path-label">{p.name}</div>
            <PathProvider data={contextData}>
              <TalentPath talents={p.items} />
            </PathProvider>
          </div>
        );[]
      })}
    </div>
  );
}

const TalentPath: FC<PathProps> = ({talents}) => {
  return (
    <div className="path">
      {talents.map((talent, index, talents) => {
        return (
          <Talent 
            talentItem={talent}
            index={index} 
            last={index === talents.length - 1} 
            key={index}
            talents={talents} />
        );
      })}
    </div>
  );
}
