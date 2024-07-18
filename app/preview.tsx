import { ThemedView } from "@/components/ThemedView"
import { useGlobalSearchParams } from "expo-router"
import { StyleSheet } from "react-native"
import { Image } from "react-native"

const PreviewScreen = () => {
  const glob = useGlobalSearchParams();
  console.log(glob.imageUri)

  return (
    <ThemedView style={styles.container}>
      <Image 
        style={styles.imagePreview}
        source={{
        uri: glob.imageUri!+""}}
      />
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    flex: 1
  }
})    

export default PreviewScreen;