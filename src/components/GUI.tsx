import { useApp } from "context/AppContext/AppContext";
import React from "react";

const GUI = () => {
  const { healthPoints, ammoCount, experiencePoints, location } = useApp();
  return (
    <div
      style={{
        height: "800px",
        width: "1000px",
        border: "1px solid red",
      }}
    >
      <h1>Health: {healthPoints}</h1>
      <h1>Ammo: {ammoCount}</h1>
      <h1>Location: {experiencePoints}</h1>
      <h1>Experience: {location}</h1>
    </div>
  );
};

export default GUI;
