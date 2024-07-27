import { Image, StyleSheet, Text, View } from "react-native";

import { Button } from "@rneui/themed";
import { ThemedView } from "@/components/ThemedView";
import { useGlobalSearchParams } from "expo-router";
import { useRouter } from "expo-router";

const ResultScreen = () => {
  const glob = useGlobalSearchParams();
  const decodedUri = decodeURIComponent(glob.imageUri + "");
  const rt = useRouter();

  const handleDiscard = () => {
    rt.push({
      pathname: "/"
    });
    console.log("Scan New Image");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.imageContainer}>
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
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{ ...styles.descriptionsText, ...styles.resultText }}>65% Fake</Text>
        <Text style={{ ...styles.descriptionsText, ...styles.cnnText} }>YOLOv8</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={{ ...styles.buttonContainer }}>
          <Button
            onPress={handleDiscard}
            title="New Scan"
            buttonStyle={{ borderRadius: 10, padding: 10 }}
            uppercase
          />
        </View>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 30,
    paddingTop: 60,
    flex: 3,
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    margin: "auto",
    borderRadius: 10
  },
  descriptionContainer: {
    padding: 20,
    flex: 1,
  },
  descriptionsText: {
    padding: 10, textAlign: "center"
  },
  resultText: {
    fontSize: 24,
    fontWeight: 700
  },
  cnnText: {
    fontSize: 18
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    padding: 30,
  },
});

export default ResultScreen;
