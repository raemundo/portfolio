import '@expo/match-media';
import { useMediaQuery } from "react-responsive";
import {
  Dimensions,
  useColorScheme,
  I18nManager,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";

export function useIsAtLeastSm() {
  return useMediaQuery({ minWidth: 640 });
}

export function useIsAtLeastMd() {
  return useMediaQuery({ minWidth: 768 });
}

export function useIsAtLeastLg() {
  return useMediaQuery({ minWidth: 1024 });
}

export function useIsAtLeastXl() {
  return useMediaQuery({ minWidth: 1280 });
}

export default function useMedia() {
  const [isClient, setIsClient] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    // if (typeof window !== "undefined") {
    // }
    setIsClient(true);
  }, []);
  const sm = useIsAtLeastSm();
  const md = useIsAtLeastMd();
  const lg = useIsAtLeastLg();
  const xl = useIsAtLeastXl();
  return {
    windowHeight: Dimensions.get("window").height
      ? Dimensions.get("window").height
      : 350,
    sm: isClient ? sm : false,
    md: isClient ? md : true,
    lg: isClient ? lg : true,
    xl: isClient ? xl : false,
    light: colorScheme === "light",
    dark: colorScheme === "dark",
    rtl: I18nManager.isRTL,
    ltr: !I18nManager.isRTL,
    web: Platform.OS === "web",
    android: Platform.OS === "android",
    ios: Platform.OS === "ios",
  };
}
