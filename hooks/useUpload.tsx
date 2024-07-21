import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

export default function useUpload() {
  const rt = useRouter();

  const onUpload = async () => {
    console.log("Upload File");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (result.assets?.length != 0) {
        const fileUri = result.assets![0].uri;
        // if we get an image, then push it to the preview page

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
            params: { imageUri: result.assets![0].uri },
          });
        }
      }
    } catch (error) {
      // console.error(error);
    }
  };

  return {
    onUpload,
  };
}
