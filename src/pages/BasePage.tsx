import React from "react";
// import TriggerMessage from "components/TriggerMessage";
import GUILayout from "components/GUI";
import { useApp } from "context/AppContext/AppContext";
import UnityLayer from "components/UnityLayer";

const Base = () => {
  const { currentListenerState } = useApp();
  const { message, amount } = currentListenerState.context;
  const { value: currentState } = currentListenerState;

  return (
    <div>
      <div style={{
          bottom: "50%",
          transform: "translate(0, 50%)",
          left: 0,
          display: "flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems: "flex-start",
          gap: "32px",
          borderRadius: "16px",
          border: "1px solid white",
          padding: "12px 28px",
          margin: "16px",
          position: "absolute",
          backdropFilter: "blur(6px)",
          backgroundColor: "#00000070",
          color: "black"
        }}>
        <h1>Statemachine Info</h1>
        <h2>Current state: {currentState}</h2>
        <h2>Last context.message: {message}</h2>
        <h2>Last context.amount: {amount}</h2>
      </div>
      {/* <TriggerMessage /> */}
      <GUILayout />
      <UnityLayer />
    </div>
  );
};

export default Base;
