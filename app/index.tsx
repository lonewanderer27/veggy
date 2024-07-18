import { StyleSheet, Text } from 'react-native'

import React from 'react'
import { ThemedView } from '@/components/ThemedView'

const HistoryScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <Text style={{ textAlign: 'center' }}>History</Text>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default HistoryScreen