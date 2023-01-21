import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useApp } from "context/AppContext/AppContext";

import {
  faLocationDot,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import AmmoIcon from "assets/ammo-white.png";
import XPIcon from "assets/xpicon.png";

const GUI = () => {
  const { healthPoints, ammoCount, experiencePoints, location } = useApp();

  return (
    <div>
      <div
        style={{
          bottom: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          gap: "32px",
          borderRadius: "16px",
          border: "1px solid white",
          padding: "12px 28px",
          margin: "16px",
          position: "absolute",
          backdropFilter: "blur(6px)",
          backgroundColor: "#6abfff78",
        }}
      >
        <FontAwesomeIcon icon={faNotesMedical} fontSize={48} />
        <h1>Health: {healthPoints}</h1>
      </div>
      <div
        style={{
          bottom: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          gap: "32px",
          borderRadius: "16px",
          border: "1px solid white",
          padding: "12px 28px",
          margin: "16px",
          position: "absolute",
          backdropFilter: "blur(6px)",
          backgroundColor: "#6abfff78",
        }}
      >
        <img src={AmmoIcon} style={{ height: "48px", width: "auto" }} alt=""/>
        <h1>Ammo: {ammoCount}</h1>
      </div>
      <div
        style={{
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          gap: "32px",
          borderRadius: "16px",
          border: "1px solid white",
          padding: "12px 28px",
          margin: "16px",
          position: "absolute",
          backdropFilter: "blur(6px)",
          backgroundColor: "#6abfff78",
        }}
      >
        <FontAwesomeIcon icon={faLocationDot} fontSize={48} />
        <h1>Location: {location}</h1>
      </div>
      <div
        style={{
          top: 0,
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          gap: "32px",
          borderRadius: "16px",
          border: "1px solid white",
          padding: "12px 28px",
          margin: "16px",
          position: "absolute",
          backdropFilter: "blur(6px)",
          backgroundColor: "#6abfff78",
        }}
      >
        <img src={XPIcon} style={{ height: "48px", width: "auto" }} alt=""/>
        <h1>Experience: {experiencePoints}</h1>
      </div>
    </div>
  );
};

export default GUI;
