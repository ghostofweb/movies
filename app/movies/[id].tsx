import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  
  // You can then fetch movie details using this id
  console.log("Movie ID:", id);
  
  return (
    <View>
      <Text>MovieDetails for ID: {id}</Text>
    </View>
  )
}

export default MovieDetails