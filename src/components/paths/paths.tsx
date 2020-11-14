import React, { FC } from 'react';
import { useGetPaths } from '../../app';
import { TalentItem } from '../../data';
import { PathProvider } from './path-context';
import { Talent } from './talent';
import './styles/paths.scss';

interface PathProps {
  talents: TalentItem[]
}

export const Paths: FC = () => {
  const paths = useGetPaths();
  return (
    <div className="talent-paths-container">
      {paths.map((p) => {

        const contextData = {
          selected: [],
          remaining: p.items
        };

        return (
          <div className="path-container" key={p.name}>
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
