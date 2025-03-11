import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError, refetch } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  // Refetch movies when searchQuery changes
  useEffect(() => {
    refetch();
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-full" resizeMode="cover" />

      {/* Movie List */}
      <FlatList
        data={movies || []} // ✅ Ensure movies is always an array
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            {/* Search Bar */}
            <View className="my-5">
              <SearchBar
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {/* Loader / Error Handling */}
            {moviesLoading && <ActivityIndicator size="large" color="#0000ff" style={{ marginVertical: 10 }} />}
            {moviesError && (
              <Text className="text-red-500 px-5 my-3">Error: {moviesError.message}</Text>
            )}

            {/* Display Search Query */}
            {searchQuery.trim() !== "" && (
              <Text className="text-xl text-white font-bold text-center my-2">
                Results for: "{searchQuery}"
              </Text>
            )}
          </>
        }
      />

      {/* No Movies Found */}
      {!moviesLoading && (movies || []).length === 0 && searchQuery.trim() !== "" && (
        <Text className="text-gray-400 text-center text-lg mt-10">No movies found.</Text>
      )}
    </View>
  );
};

export default search;
