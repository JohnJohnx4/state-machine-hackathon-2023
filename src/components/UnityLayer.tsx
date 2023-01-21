import React from "react";
import { useUnity } from "context/UnityContext/UnityContext";
import { Unity } from "react-unity-webgl";
import styled  from "styled-components";
// import { UnityStyles } from './UnityLayer.styles';

const UnityContainer = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 9;
    overflow: hidden;
    .unity-canvas {
        width: 100%;
        height: 100%;
    }
`;

const UnityLayer: React.FC = () => {
  const { unityProvider } = useUnity();
  return (
    <UnityContainer id="unity-layer-container" className="wrapper">
      {unityProvider && (
        <Unity className="unity-canvas" unityProvider={unityProvider} />
      )}
    </UnityContainer>
  );
};

export default UnityLayer;
