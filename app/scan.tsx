import { Button, Text, View } from 'react-native'
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';

import { FloatingAction } from 'react-native-floating-action';
import React from 'react'
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView'

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return (
      <ThemedView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Camera Loading...</Text>
      </ThemedView>
    )
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView style={styles.camera} facing="back">
        <FloatingAction position="center" />
      </CameraView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
  }
})
 
export default ScanScreen