import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // For API call debounce

  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch,
  } = useFetch(() => fetchMovies({ query: debouncedQuery }), false);

  // Debounce API call only
 useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedQuery(searchQuery);
    
    // Ensure movies array is valid before calling updateSearchCount
    if (movies && movies.length > 0) {
      updateSearchCount(searchQuery, movies[0]);
    }
  }, 500); // 500ms debounce delay for API calls

  return () => clearTimeout(handler);
}, [searchQuery, movies]); // Ensure movies is included as a dependency

  // Fetch movies when debouncedQuery updates
  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      refetch();
    }
  }, [debouncedQuery]);

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <Image source={images.bg} className="absolute w-full h-64" resizeMode="cover" />

      {/* Logo */}
      <View className="w-full flex-row justify-center mt-16">
        <Image source={icons.logo} className="w-12 h-10" />
      </View>

      {/* Search Bar */}
      <View className="my-5 px-5">
        <SearchBar
          placeholder="Search Movies..."
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
        />
      </View>

      {/* Show "Results for: {query}" in real time */}
      <View className="flex-row pl-5 my-2">
        <Text className="text-xl font-bold text-white">Results for: </Text>
        {searchQuery.trim() !== "" && (
          <Text className="text-xl font-bold text-blue-500 ml-2">{searchQuery}</Text>
        )}
      </View>

      {/* Show results only if there's a query */}
      {searchQuery.trim() !== "" ? (
        <FlatList
          data={movies || []}
          renderItem={({ item }) => <MovieCard {...item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 16,
            marginVertical: 16,
          }}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 10 }}
          ListHeaderComponent={
            <>
              {/* Loader / Error Handling */}
              {moviesLoading && (
                <ActivityIndicator size="large" color="#0000ff" className="my-4" />
              )}
              {moviesError && (
                <Text className="text-red-500 text-center px-5 my-3">
                  Error: {moviesError.message}
                </Text>
              )}
            </>
          }
        />
      ) : (
        // Show "No movies found." when searchQuery is empty
        <Text className="text-gray-400 text-center text-lg mt-10">
          No movies found.
        </Text>
      )}
    </View>
  );
};

export default Search;
