import "react-native-reanimated";

import * as SplashScreen from "expo-splash-screen";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import useShare from "@/hooks/useShare";
import useUpload from "@/hooks/useUpload";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={CustomDrawerContent}>
          <Drawer.Screen
            name="preview"
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="index"
            options={{
              title: "Scan",
            }}
          />
          <Drawer.Screen
            name="result"
            options={{
              headerShown: false,
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { onUpload } = useUpload();
  const { onShare } = useShare();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Scan"
        icon={() => <Ionicons name="scan" size={25} />}
        onPress={() => {
          console.log("Scan Page");
          props.navigation.navigate("index");
        }}
      />
      <DrawerItem
        label="Upload File"
        icon={() => <Ionicons name="cloud-upload-outline" size={25} />}
        onPress={onUpload}
      />
      <DrawerItem
        label="Share"
        icon={() => <Ionicons name="share-social-outline" size={25} />}
        onPress={onShare}
      />
    </DrawerContentScrollView>
  );
};
