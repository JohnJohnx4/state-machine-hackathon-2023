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
  const [healthPoints, setHealthPoints] = useState<number>(100);
  const [ammoCount, setAmmoCount] = useState<number>(20);
  const [location, setLocation] = useState<string>("Spawn");
  const [experiencePoints, setExperiencePoints] = useState<number>(0);

  const [currentToggleState, sendToggleState] = useMachine(toggleMachine);
  const [currentListenerState, sendListenerState] = useMachine(
    interfaceListenerMachine
  );
  const { message, amount, area } = currentListenerState.context;

  useEffect(() => {
    switch (message) {
      case "hp":
        setHealthPoints((p) => p + amount);
        sendListenerState({ type: "UpdateHealth", context: 0 });
        break;
      case "ammo":
        setAmmoCount(amount);
        sendListenerState({ type: "UpdateAmmo", context: 0 });
        break;
      case "loc":
        setLocation(area);
        sendListenerState({ type: "UpdateLocation", context: 0 });
        break;
      case "exp":
        setExperiencePoints((p) => p + amount);
        sendListenerState({ type: "UpdateExperience", context: 0 });
        break;
      default:
        break;
    }
  }, [message, amount, area, sendListenerState]);

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
