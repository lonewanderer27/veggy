import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

export default function useUpload() {
  const rt = useRouter();

  const onUpload = async () => {
    console.log('Upload File')
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })

      if (result.assets?.length != 0) {
        // if we get an image, then push it to the preview page
        rt.push({
          pathname: "/preview",
          params: { imageUri: result.assets![0].uri }
        })
      }
    } catch (error) {
      // console.error(error);
    }
  }

  return {
    onUpload,
  }
}