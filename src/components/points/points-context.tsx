import React, { useState, createContext, useContext, useMemo, FC } from 'react';

interface PointsContext {
  spent: number;
  setSpent: (value: number) => void;
  total: number;
  setTotal: (value: number) => void;
}

const Context = createContext<PointsContext>(null as any);

export const PointsProvider: FC = ({children}) => {
  const [spent, setSpent] = useState<number>(0);
  const [total, setTotal] = useState<number>(6);

  const pointsContext = useMemo(() => {
    return {
      spent,
      setSpent,
      total,
      setTotal
    };
  }, [spent, total]);

  return <Context.Provider value={pointsContext} children={children} />;
}

export const usePointsContext = () => useContext(Context);