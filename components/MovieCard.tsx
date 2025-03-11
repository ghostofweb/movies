import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';

// Define the Movie type props
interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  release_date: string;
  genres?: string[]; 
 
}

const MovieCard = ({ id, poster_path, title, vote_average, release_date, genres }: Movie) => {
  const [loading, setLoading] = useState(true);

  return (
    <Link href={{
      pathname: '/movies/[id]',
      params: { id: id.toString() }
    }} asChild>
      <TouchableOpacity 
        className='w-[30%] rounded-lg' 
        activeOpacity={0.7} // Improves touch feedback
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5, // Android shadow
        }}
      >
        {/* Movie Poster with a Loader */}
        <View className='relative'>
          {loading && (
            <View className='absolute inset-0 flex items-center justify-center bg-gray-800 rounded-lg'>
              <ActivityIndicator size="small" color="#FFD700" />
            </View>
          )}
          <Image 
            source={{
              uri: poster_path 
                ? `https://image.tmdb.org/t/p/w500${poster_path}` 
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
            }} 
            className='w-full h-40 rounded-lg' 
            resizeMode='cover'
            onLoadEnd={() => setLoading(false)}
          />
        </View>

        {/* Movie Title */}
        <Text 
          className='text-sm font-bold text-white mt-2' 
          numberOfLines={2}
        >
          {title || "Untitled Movie"}
        </Text>

        {/* Release Year & Rating */}
        <View className='flex-row justify-between mt-1'>
          <Text className='text-xs text-gray-400'>
            {release_date ? release_date.substring(0, 4) : 'N/A'}
          </Text>
          <Text className='text-xs text-yellow-400 font-bold'>
            ⭐ {vote_average ? vote_average.toFixed(1) : 'N/A'}
          </Text>
        </View>

        {/* Genre Chips (If Available) */}
        {genres && genres.length > 0 && (
          <View className="flex-row flex-wrap mt-2">
            {genres.slice(0, 2).map((genre, index) => (
              <Text 
                key={index} 
                className="text-[10px] bg-gray-700 text-white px-2 py-1 rounded-full mr-1"
              >
                {genre}
              </Text>
            ))}
          </View>
        )}
      </TouchableOpacity>
    </Link>
  );
}

export default MovieCard;
