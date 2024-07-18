import { Share } from 'react-native';

export default function useShare() {
  const onShare = async () => {
    console.log('Share')
    try {
      await Share.share({
        message: "I'm using Veriluxe Louis Vuitton Authentication app, the fastest and reliable bag authenticator. Try it NOW! https://play.google.com/store/apps/details?id=com.veriluxe.scan",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    onShare
  }
}