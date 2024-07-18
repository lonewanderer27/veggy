import { Button, Text } from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FAB } from '@rneui/themed';
import React, { useRef } from 'react'                 
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView'
import useUpload from '@/hooks/useUpload';
import { useRouter } from 'expo-router';

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const rt = useRouter();

  const { onUpload } = useUpload();

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();

      if (photo) {
        rt.push({
          pathname: "/preview",
          params: { imageUri: photo.uri }
        })
      }
    }
  }

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
      <ThemedView style={styles.permissionContainer}>
        <Text style={{ textAlign: 'center', padding: 12 }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <CameraView style={styles.camera} facing="back" ref={cameraRef}>
        <FAB
          icon={{ name: "photo", color: "white" }}
          placement="left"
          style={{ padding: 10 }}
          onPress={onUpload}
        />
        <FAB
          icon={{ name: "camera", color: "white" }}  
          style={{ paddingBottom: 10, left: 0 }}
          placement='right'
          onPress={handleCapture}
        />
      </CameraView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    padding: 24
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  galleryBtn: {
    position: 'absolute',
    left: 20,
    bottom: 20
  }
})

export default ScanScreen