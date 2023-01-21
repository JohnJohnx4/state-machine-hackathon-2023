import React from "react";
import TriggerMessage from "components/TriggerMessage";
import GUILayout from "components/GUI";
import { useApp } from "context/AppContext/AppContext";
const Base = () => {
  const { currentListenerState } = useApp();
  const { message, amount } = currentListenerState.context;
  const { value: currentState } = currentListenerState;

  console.log("current listener", currentListenerState);

  return (
    <div>
      <h1>Base Page</h1>
      <h2>Current state: {currentState}</h2>
      <h2>Current Message: {message}</h2>
      <h2>Current Amount: {amount}</h2>
      <TriggerMessage />
      <GUILayout />
    </div>
  );
};

export default Base;
