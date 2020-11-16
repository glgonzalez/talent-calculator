import React, { FC, useEffect, useState } from 'react';
import { TalentItem } from './talent';
import { TalentPathProvider, useTalentPathContext } from './talent-path-context';
import { Talent } from './talent';
import './styles/paths.scss';
import { TalentErrorBoundary } from 'components/error-boundary';
import { usePointsContext } from 'components/points';

export interface Path {
  items: TalentItem[];
  name: string;
}

export const Paths: FC = () => {
  const [paths, setPaths] = useState<Path[]>();
  const { spent } = usePointsContext();
  const [errorBoundaryKey, setErrorBoundaryKey] = useState<number>(0);

  useEffect(() => {
    setErrorBoundaryKey(errorBoundaryKey + 1);
  }, [spent]);

  useEffect(() => {
    fetch('/api/v1/talent-paths').then(async response => {
      return await response.json();
    }).then(async data => {
      setPaths(await data);
    });
  }, []);

  return (
    <TalentErrorBoundary key={errorBoundaryKey}>
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
    </TalentErrorBoundary>
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
            key={talent.id} 
          />
        );
      })}
    </div>
  );
}
