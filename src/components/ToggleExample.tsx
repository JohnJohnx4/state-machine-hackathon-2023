import { useApp } from "context/AppContext/AppContext";

const ToggleExampleComponent = () => {
  const { currentToggleState, sendToggleState } = useApp();
  const active = currentToggleState.matches("active");
  const { count } = currentToggleState.context;

  const handleButtonToggle = () => sendToggleState({ type: "TOGGLE" });

  return (
    <div>
      <h2>Fork this template!</h2>
      <button onClick={() => handleButtonToggle()}>
        Click me ({active ? "✅" : "❌"})
      </button>
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
};

export default ToggleExampleComponent;
