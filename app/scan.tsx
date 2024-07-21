import { Button, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { FAB } from "@rneui/themed";
import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import useUpload from "@/hooks/useUpload";
import { useRouter } from "expo-router";
import { useMediaLibraryPermissions } from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

const ScanScreen = () => {
  const [camPerm, reqCamPerm] = useCameraPermissions();
  const [mediaPerm, reqMediaPerm] = useMediaLibraryPermissions();
  const cameraRef = useRef<CameraView>(null);
  const rt = useRouter();

  const { onUpload } = useUpload();

  const handleCapture = async () => {
    const photo = await cameraRef.current!.takePictureAsync();

    if (photo) {
      console.log("rawUri: ", photo.uri);
      const fileUri = photo.uri;

      // On Android, convert file URI to content URI
      if (Platform.OS === "android") {
        const assetInfo = await FileSystem.getInfoAsync(fileUri, {
          size: true,
        });
        if (assetInfo.exists) {
          console.log("File Info: ", assetInfo);
          const contentUri =
            FileSystem.documentDirectory +
            "photos/" +
            assetInfo.uri.split("/").pop();
          await FileSystem.copyAsync({ from: assetInfo.uri, to: contentUri });
          const encodedUri = encodeURIComponent(contentUri);
          console.log("encodedUri: ", encodedUri);

          rt.push({
            pathname: "/preview",
            params: {
              imageUri: encodedUri,
            },
          });
        }
      } else {
        const encodedUri = encodeURIComponent(fileUri);
        console.log("encodedUri: ", encodedUri);

        rt.push({
          pathname: "/preview",
          params: {
            imageUri: encodedUri,
          },
        });
      }
    }
  };

  if (!camPerm || !mediaPerm) {
    // Camera permissions are still loading.
    return (
      <ThemedView style={styles.container}>
        <Text style={{ textAlign: "center" }}>Camera Loading...</Text>
      </ThemedView>
    );
  }

  if (!camPerm.granted) {
    // Camera permissions are not granted yet.
    return (
      <ThemedView style={styles.permissionContainer}>
        <Text style={{ textAlign: "center", padding: 12 }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={reqCamPerm} title="grant permission" />
      </ThemedView>
    );
  }

  if (!mediaPerm.granted) {
    // Media permissions are not granted yet.
    return (
      <ThemedView style={styles.permissionContainer}>
        <Text style={{ textAlign: "center", padding: 12 }}>
          We need your permission to access media library
        </Text>
        <Button onPress={reqMediaPerm} title="grant permission" />
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
          placement="right"
          onPress={handleCapture}
        />
      </CameraView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    padding: 24,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  galleryBtn: {
    position: "absolute",
    left: 20,
    bottom: 20,
  },
});

export default ScanScreen;
