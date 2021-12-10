import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";

// import * as Analytics from "expo-firebase-analytics";
import tw, { useDeviceContext } from "~/lib/tailwind";

import "~/lib/i18n";
import Screens from "./Screens";



const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}


export default function App() {
  useDeviceContext(tw);
  const routeNameRef = useRef();
  return (
    <NavigationContainer
      // @ts-ignore
      ref={navigationRef}
      onReady={() =>
        (routeNameRef.current = navigationRef.current.getCurrentRoute().name)
      }
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          // await Analytics.setCurrentScreen(currentRouteName);
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
    >
      <Screens />
    </NavigationContainer>
  );
}
