import 'react-native-reanimated';

import * as ImagePicker from 'expo-image-picker';
import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Share } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer drawerContent={CustomDrawerContent}>
          <Drawer.Screen name="scan" options={{
            title: 'Scan',
          }} />
          <Drawer.Screen name="index" options={{
            title: 'History',
          }} />
        </Drawer>
      </GestureHandlerRootView>
    </ThemeProvider>

  )
}

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const handleShare = async () => {
    console.log('Share')
    try {
      await Share.share({
        message: "I'm using Veriluxe Louis Vuitton Authentication app, the fastest and reliable bag authenticator. Try it NOW! https://play.google.com/store/apps/details?id=com.veriluxe.scan",
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpload = async () => {
    console.log('Upload File')
    try {
      await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label="Scan"
        icon={() => <Ionicons name="scan" size={25} />}
        onPress={() => {
          console.log('Scan Page')
          props.navigation.navigate('scan');
        }}
      />
      <DrawerItem
        label="Upload File"
        icon={() => <Ionicons name="cloud-upload-outline" size={25} />}
        onPress={handleUpload}
      />
      <DrawerItem
        label="History"
        icon={() => <Ionicons name="newspaper-outline" size={25} />}
        onPress={() => {
          props.navigation.navigate('index');
          console.log('History Page')
        }}
      />
      <DrawerItem
        label="Share"
        icon={() => <Ionicons name="share-social-outline" size={25} />}
        onPress={handleShare}
      />
    </DrawerContentScrollView>
  )
}