import { useApp } from "context/AppContext/AppContext";
import React, { useCallback, useEffect } from "react";

import { createContext, useContext } from "react";
import { useUnityContext } from "react-unity-webgl";
import { UnityProvider } from "react-unity-webgl/distribution/types/unity-provider";

declare global {
  interface Window {
    receiveUnityMessage: any;
  }
}

interface UnityMessageData {
  platform: string;
  type: string;
  message: string;
}

export enum TextureEnum {
  Skin = "skin",
  Hair = "hair",
  Eyes = "eye",
  Shirt = "shirt",
}

export const UnityCtx = createContext({});

interface UnityContextInterface {
  unityProvider: UnityProvider;
  isLoaded: boolean;
  loadingProgression: number;
  takeUnityScreenshot: () => void;
  sendMessage: (
    gameObjectName: string,
    methodName: string,
    parameter?: any
  ) => void;
}

const parseDataString: (data: any) => UnityMessageData = (data: any) => {
  if (typeof data === "string") {
    return JSON.parse(data);
  } else {
    return data as UnityMessageData;
  }
};

const UnityStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    unityProvider,
    isLoaded,
    loadingProgression,
    addEventListener,
    removeEventListener,
    takeScreenshot,
    sendMessage,
  } = useUnityContext({
    loaderUrl: process.env.PUBLIC_URL + "/unity/statemachine.loader.js",
    dataUrl: process.env.PUBLIC_URL + "/unity/statemachine.data.unityweb",
    frameworkUrl:
      process.env.PUBLIC_URL + "/unity/statemachine.framework.js.unityweb",
    codeUrl: process.env.PUBLIC_URL + "/unity/statemachine.wasm.unityweb",
    webglContextAttributes: {
      preserveDrawingBuffer: true,
    },
  });

  const { setAmmoCount, setHealthPoints, setLocation, setExperiencePoints } =
    useApp();

  const handleGUIUpdate = (_parsedData: {
    platform: string;
    type: string;
    message: string;
  }) => {
    // {"platform":"unity","type":"ammo_count","message":"28"}
    switch (_parsedData.type) {
      case "health_adjust":
        setHealthPoints(parseInt(_parsedData.message));
        break;
      case "ammo_count":
        setAmmoCount(parseInt(_parsedData.message));
        break;
      case "location_update":
        setLocation(_parsedData.message);
        break;
      case "experience_adjust":
        setExperiencePoints(parseInt(_parsedData.message));
        break;
      default:
        break;
    }
  };

  const handleRecievedUnityMessage = useCallback((_message: string) => {
    const parsedData: { platform: string; type: string; message: string } =
      parseDataString(_message);
    console.log("Item Logged in [RecieveMessageService]", { parsedData });
    handleGUIUpdate(parsedData);
    // eslint-disable-next-line
  }, []);

  function takeUnityScreenshot() {
    const dataUrl = takeScreenshot("image/jpg", 0.5);
    var image = new Image();
    image.src = dataUrl!;
    var w = window.open("");
    w?.document.write(image.outerHTML);

    // var link = document.createElement('a');
    // link.download = "unity-screenshot.jpg";
    // link.href = dataUrl!;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // window.open(dataUrl, '_blank');
  }

  useEffect(() => {
    addEventListener("receiveUnityMessage", handleRecievedUnityMessage);
    if (window.receiveUnityMessage)
      window.receiveUnityMessage = handleRecievedUnityMessage;
    return () => {
      removeEventListener("receiveUnityMessage", handleRecievedUnityMessage);
    };
  }, [addEventListener, removeEventListener, handleRecievedUnityMessage]);

  return (
    <UnityCtx.Provider
      value={{
        unityProvider,
        isLoaded,
        loadingProgression,
        takeUnityScreenshot,
        sendMessage,
      }}
    >
      {children}
    </UnityCtx.Provider>
  );
};

export const useUnity = () => {
  return useContext(UnityCtx) as UnityContextInterface;
};

export default UnityStateProvider;
