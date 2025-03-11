import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  RefreshControl,
  ScrollView,
  Dimensions,
} from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import { useState, useCallback } from "react";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();
  const { width } = Dimensions.get("window"); // Get screen width for responsive layout

  // Fetch movies and trending movies
  const { data: movies, loading: moviesLoading, error: moviesError, refetch: refetchMovies } = useFetch(() =>
    fetchMovies({ query: "" })
  );
  const { data: trendingMovies, loading: trendingLoading, error: trendingError, refetch: refetchTrending } = useFetch(
    getTrendingMovies
  );

  // State for pull-to-refresh
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchMovies(), refetchTrending()]);
    setRefreshing(false);
  }, [refetchMovies, refetchTrending]);

  // Calculate card width for 3-column grid: total padding (40) + total gap (40)
  const cardWidth = (width - 80) / 3;

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <ImageBackground
        source={images.bg}
        className="w-full h-64 absolute top-0 left-0"
        resizeMode="cover"
      />

      {/* Main Content */}
      <FlatList
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }} // Consistent padding
        ListHeaderComponent={
          <View>
            {/* Logo */}
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-20 mb-5 mx-auto"
              resizeMode="contain"
            />
            {/* Trending Movies Section */}
            {trendingMovies && (
              <View className="mt-10 mb-5">
                <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-3"
                  contentContainerStyle={{ gap: 16 }} // Spacing between cards
                >
                  {trendingMovies.map((movie, index) => (
                    <TrendingCard key={movie.movie_id} movie={movie} index={index} />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Latest Movies Title */}
            <Text className="text-lg text-white font-bold mb-3">Latest Movies</Text>
          </View>
        }
        data={moviesLoading || trendingLoading || moviesError || trendingError ? [] : movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieCard {...item} style={{ width: cardWidth }} />} // Responsive card width
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "space-between", // Evenly distribute cards
          marginBottom: 10, // Space between rows
        }}
        ListFooterComponent={
          moviesLoading || trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
          ) : moviesError || trendingError ? (
            <Text className="text-white text-center mt-10">
              Error: {moviesError?.message || trendingError?.message}
            </Text>
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
        }
      />
    </View>
  );
}