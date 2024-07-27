import { Alert, Image, Platform, ToastAndroid, View } from "react-native";
import { useGlobalSearchParams, useRouter } from "expo-router";

import { Button } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";

const PreviewScreen = () => {
  const glob = useGlobalSearchParams();
  const decodedUri = decodeURIComponent(glob.imageUri + "");
  console.log("decodedUri: " + decodedUri);

  const rt = useRouter();

  const handleDiscard = () => {
    rt.push({
      pathname: "/"
    });
    console.log("Discard Image"); 
  }

  const handleProcess = () => {
    // if (Platform.OS === "android") {
    //   ToastAndroid.show("Not Implemented Yet", ToastAndroid.SHORT);
    // } 

    // if (Platform.OS === "ios") {
    //   Alert.alert("Not Implemented Yet");
    // }

    // TODO: Pass the data to the model and get the result

    // encode the Uri again
    const encodedUri = encodeURI(decodedUri);

    rt.push({
      pathname: "/result",
      params: {
        imageUri: encodedUri
      }
    })
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        style={styles.imagePreview}
        source={{
          uri: decodedUri,
        }}
        onLoad={() => console.log("Image Loaded")}
        onError={(error) => {
          console.log("Image Error");
          console.log(error);
        }}
      />
      <View style={styles.buttonsContainer}>
        <View style={{ ...styles.buttonContainer, paddingRight: 10 }}>
          <Button onPress={handleDiscard} title="Discard" buttonStyle={{ borderRadius: 5, padding: 10 }} uppercase />
        </View>
        <View style={{ ...styles.buttonContainer, paddingLeft: 10 }}>   
          <Button onPress={handleProcess} title="Scan" buttonStyle={{ borderRadius: 5, padding: 10 }} uppercase />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    flex: 1,
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    marginBottom: 20
  },
  buttonContainer: {
    flex: 1,
    padding: 30
  }
});

export default PreviewScreen;
