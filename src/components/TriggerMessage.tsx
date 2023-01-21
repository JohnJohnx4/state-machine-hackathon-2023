import { useApp } from "context/AppContext/AppContext";
import React, { useState } from "react";

const tempStyles = {
  margin: "4px 8px",
  padding: "16px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
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
    console.log("updating", name, value);

    setInputState((p) => ({ ...p, [name]: value }));
  };

  const triggerHealthMessage = () => {
    console.log("TriggerHealthMessage");
    sendListenerState({
      type: "EventMessageRecieved",
      context: { message: "hp", amount: inputState.health },
    });
};
const triggerAmmoMessage = () => {
    console.log("TriggerAmmoMessage");
    sendListenerState({
        type: "EventMessageRecieved",
        context: { message: "ammo", amount: inputState.ammo },
    });
  };
  const triggerLocationMessage = () => {
    console.log("TriggerLocationMessage");
    sendListenerState({
      type: "EventMessageRecieved",
        context: { message: "loc", amount: inputState.location },
    });
  };
  const triggerExperienceMessage = () => {
    console.log("TriggerExperienceMessage");
    sendListenerState({
      type: "EventMessageRecieved",
        context: { message: "exp", amount: inputState.exp },
    });
  };
  const triggerUIReset = () => {
    console.log("triggerUIReset");
    sendListenerState({
      type: "UpdateHealth",
      cond: "hp",
    });
  };
  return (
    <div>
      <h1>TriggerMessage</h1>
      <input name="health" value={inputState.health} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerHealthMessage()}>
        TriggerHealthMessage
      </button>
      <input name="ammo" value={inputState.ammo} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerAmmoMessage()}>
        TriggerAmmoMessage
      </button>
      <input name="location" value={inputState.location} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerLocationMessage()}>
        TriggerLocationMessage
      </button>
      <input name="exp" value={inputState.exp} onChange={handleInput} />
      <button style={tempStyles} onClick={() => triggerExperienceMessage()}>
        TriggerExperienceMessage
      </button>
      <br />
      <button style={tempStyles} onClick={() => triggerUIReset()}>
        TriggerExperienceMessage
      </button>
    </div>
  );
};

export default TriggerMessage;
