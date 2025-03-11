import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const TrendingCard = ({movie:{movie_id,title,poster_url},index}:TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`}>
      <TouchableOpacity className='w-32 relative'>
        <Image
        source={{uri:poster_url}}
        className='w-32 h-48 rounded-lg'
        />
        <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
        
        </View>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard