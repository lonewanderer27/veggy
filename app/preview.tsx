import { ThemedView } from "@/components/ThemedView"
import { useGlobalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"
import { Image, Text } from "react-native"

const PreviewScreen = () => {
  const glob = useGlobalSearchParams();
  const decodedUri = decodeURIComponent(glob.imageUri+"");
  console.log("decodedUri: "+decodedUri);

  return (
    <ThemedView style={styles.container}>
      <Image 
        style={styles.imagePreview}
        source={{ 
        uri: decodedUri }}
        onLoad={() => console.log("Image Loaded")}
        onError={(error) => {
          console.log("Image Error")
          console.log(error )  
        }}  
      />
    </ThemedView>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    flex: 1,
  }
})    

export default PreviewScreen;