import * as FileSystem from "expo-file-system";

import { Button, Icon } from "@rneui/themed";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef } from "react";
import { Stack, useRouter } from "expo-router";

import { FAB } from "@rneui/themed";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { useMediaLibraryPermissions } from "expo-image-picker";
import useUpload from "@/hooks/useUpload";

const ScanScreen = () => {
  const [camPerm, reqCamPerm] = useCameraPermissions();
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

  if (!camPerm) {
    // Camera permissions are still loading.
    return (
      <>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
          <Button type="clear" loading />
          <Text
            style={{
              textAlign: "center",
              padding: 15,
              fontSize: 22,
              marginTop: 10,
            }}
          >
            Camera Loading...
          </Text>
        </ThemedView>
      </>
    );
  }

  if (!camPerm.granted) {
    // Camera permissions are not granted yet.
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ThemedView style={styles.permissionContainer}>
          <Icon name="camera" size={70} />
          <Text style={{ textAlign: "center", padding: 12, fontSize: 22 }}>
            We need your permission to show the camera
          </Text>
          <Button
            buttonStyle={{ borderRadius: 10, padding: 15, marginTop: 10 }}
            onPress={reqCamPerm}
            title="grant permission"
            uppercase
          />
        </ThemedView>
      </ThemedView>
    </>;
  }

  // Camera permission has been granted and camera has loaded!
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
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
    </>
  );
};

const styles = StyleSheet.create({
  permissionContainer: {
    padding: 30,
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
