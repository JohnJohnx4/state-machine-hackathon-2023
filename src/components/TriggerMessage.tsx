import { useApp } from "context/AppContext/AppContext";
import React, { useState } from "react";

const tempStyles = {
  margin: "4px 8px",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
};
const defaultState = {
  health: 0,
  ammo: 0,
  location: "",
  exp: 0,
};
const TriggerMessage = () => {
  const [inputState, setInputState] = useState({
    health: 0,
    ammo: 0,
    location: "",
    exp: 0,
  });
  const { sendListenerState } = useApp();

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setInputState((p) => ({ ...p, [name]: value }));
  };

  const triggerHealthMessage = () => {
    sendListenerState({
      type: "EventMessageRecieved",
      context: { message: "hp", amount: inputState.health },
    });
    setInputState(defaultState);
  };

  const triggerAmmoMessage = () => {
    sendListenerState({
      type: "EventMessageRecieved",
      context: { message: "ammo", amount: inputState.ammo },
    });
    setInputState(defaultState);
  };

  const triggerLocationMessage = () => {
    sendListenerState({
      type: "EventMessageRecieved",
      context: { message: "loc", area: inputState.location },
    });
    setInputState(defaultState);
  };

  const triggerExperienceMessage = () => {
    sendListenerState({
      type: "EventMessageRecieved",
      context: { message: "exp", amount: inputState.exp },
    });
    setInputState(defaultState);
  };

  return (
    <div>
      <h1>TriggerMessage</h1>
      <input name="health" value={inputState.health} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerHealthMessage()}>
        TriggerHealthMessage
      </button>
      <br />
      <input name="ammo" value={inputState.ammo} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerAmmoMessage()}>
        TriggerAmmoMessage
      </button>
      <br />
      <input
        name="location"
        value={inputState.location}
        onChange={handleInput}
      />
      <button style={tempStyles} onClick={() => triggerLocationMessage()}>
        TriggerLocationMessage
      </button>
      <br />
      <input name="exp" value={inputState.exp} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerExperienceMessage()}>
        TriggerExperienceMessage
      </button>
      <br />
    </div>
  );
};

export default TriggerMessage;
