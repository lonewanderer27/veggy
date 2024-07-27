import { Alert, Image, Platform, ToastAndroid, View } from "react-native";
import {
  Tensor,
  TensorflowModel,
  useTensorflowModel,
} from "react-native-fast-tflite";
import { useGlobalSearchParams, useRouter } from "expo-router";

import { Button } from "@rneui/themed";
import ImageResizer from "react-native-image-resizer";
import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { convertToRGB } from "react-native-image-to-rgb";
import { useEffect } from "react";

const tensorToString = (tensor: Tensor): string => {
  return `\n  - ${tensor.dataType} ${tensor.name}[${tensor.shape}]`;
};

const modelToString = (model: TensorflowModel): string => {
  return (
    `TFLite Model (${model.delegate}):\n` +
    `- Inputs: ${model.inputs.map(tensorToString).join("")}\n` +
    `- Outputs: ${model.outputs.map(tensorToString).join("")}`
  );
};

const PreviewScreen = () => {
  const glob = useGlobalSearchParams();
  const decodedUri = decodeURIComponent(glob.imageUri + "");
  console.log("decodedUri: " + decodedUri);

  // load the tf model
  const model = useTensorflowModel(require("../assets/kaggleYoloV5.tflite"));
  const actualModel = model.state === "loaded" ? model.model : undefined;

  const rt = useRouter();

  const handleDiscard = () => {
    rt.push({
      pathname: "/",
    });
    console.log("Discard Image");
  };

  useEffect(() => {
    if (actualModel == null) return;
    console.log(`Model loaded! Shape:\n${modelToString(actualModel)}]`);
  }, [actualModel]);

  const resizeImage = async (uri: string, width: any, height: any) => {
    const res = await ImageResizer.createResizedImage(
      uri,
      width,
      height,
      "PNG",
      100,
      0,
      undefined,
      true,
      { mode: "stretch" }
    );
    return res.uri
  };
  
  const handleProcess = async () => {
    // resize the image to our model's size input
    // TODO: Change the size here to what the actual model requires
    const resizedImage = await resizeImage(decodedUri, 640, 640);

    // convert resized image to RGB values
    const convertedArray = await convertToRGB(resizedImage);
    let red = []
    let blue = []
    let green = []
    for (let index = 0; index < convertedArray.length; index += 3) {
      red.push(convertedArray[index] / 255);
      green.push(convertedArray[index + 1] / 255);
      blue.push(convertedArray[index + 2] / 255);
    }
    const finalArray = [...red, ...green, ...blue];
    const arrayBuffer = new Uint32Array(finalArray);

    // run the model with the buffer
    const result = actualModel?.runSync([arrayBuffer]);
    console.log(result);

    // encode the Uri again
    const encodedUri = encodeURI(decodedUri);

    // navigate to the results page with the results
    rt.push({
      pathname: "/result",
      params: {
        imageUri: encodedUri,
      },
    });
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
          <Button
            onPress={handleDiscard}
            title="Discard"
            buttonStyle={{ borderRadius: 5, padding: 10 }}
            uppercase
          />
        </View>
        <View style={{ ...styles.buttonContainer, paddingLeft: 10 }}>
          <Button
            onPress={handleProcess}
            title="Scan"
            buttonStyle={{ borderRadius: 5, padding: 10 }}
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
  imagePreview: {
    flex: 1,
  },
  buttonsContainer: {
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

export default PreviewScreen;
