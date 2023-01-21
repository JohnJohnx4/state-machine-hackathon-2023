////////////////////////////////////////////////////////////////
//! Application Context
//
//* This context will be used to control the message system
//*   to communicate between the bottom and top layers, the
//*   actions required to enable this communication, and any
//*   other controlled values to display to the user Ex:
//*   points, leaderboards, catalogs, etc
//*
//
////////////////////////////////////////////////////////////////
import { useMachine } from "@xstate/react";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  // useCallback,
  // useRef,
} from "react";
import { toggleMachine, interfaceListenerMachine } from "./stateMachines";
// import { AppContextInterface } from "./AppTypes";

export const AppCtx = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

const ApplicationProvider: React.FC<Props> = ({ children }) => {
  const [state, setState] = useState(false);

  //stats
  const [healthPoints, setHealthPoints] = useState(100);
  const [ammoCount, setAmmoCount] = useState(20);
  const [experiencePoints, setExperiencePoints] = useState("Spawn");
  const [location, setLocation] = useState(0);

  const [currentToggleState, sendToggleState] = useMachine(toggleMachine);
  const [currentListenerState, sendListenerState] = useMachine(
    interfaceListenerMachine
  );
  const { message, amount } = currentListenerState.context;

  useEffect(() => {
    console.log("values updated!", message, amount);
    switch (message) {
      case "hp":
        setHealthPoints((p) => p + amount);
        console.log("Adjusting HP by ", amount);
        break;
      default:
        break;
    }
  }, [message, amount]);

  return (
    <AppCtx.Provider
      value={{
        state,
        setState,
        currentToggleState,
        sendToggleState,
        currentListenerState,
        sendListenerState,
        healthPoints,
        setHealthPoints,
        ammoCount,
        setAmmoCount,
        experiencePoints,
        setExperiencePoints,
        location,
        setLocation,
      }}
    >
      {children}
    </AppCtx.Provider>
  );
};

export const useApp = () => {
  //! FIX ME LATER
  return useContext(AppCtx) as any;
  //! FIX ME LATER

  // Should use interface for typing
  // return useContext(AppCtx) as AppContextInterface;
};
export default ApplicationProvider;
