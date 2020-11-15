import React, { createContext, FC, useState, useMemo, useContext } from "react";

interface EventContext {
  isTouchEvent: boolean;
}

const TouchEventContext = createContext<EventContext>({isTouchEvent: false});

export const TouchEventHandlerProvider: FC = ({children}) => {
  const [isTouchEvent, setIsTouchEvent] = useState<boolean>(false);
  document.addEventListener("touchstart", (event) => {
    const element = event.target as HTMLElement;
    if(element.className.includes('talent-icon')) {
      setIsTouchEvent(true);
    }
  });

  const touchEventContext = useMemo(() => {
    return {
      isTouchEvent
    }
  }, [isTouchEvent]);
  return <TouchEventContext.Provider value={touchEventContext} children={children} />;
}

export const useTouchEventHanler = () => useContext(TouchEventContext);