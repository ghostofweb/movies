import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, ImageBackground, Text, View } from "react-native";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      {/* Background Image */}
      <ImageBackground source={images.bg} className="w-full h-64 absolute top-0 left-0" resizeMode="cover" />
      
      <View className="px-5">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" resizeMode="contain" />
        <SearchBar
          placeholder="Search for a movie"
        />
        <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
      </View>
      
      {moviesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
      ) : moviesError ? (
        <Text className="text-white text-center mt-10">Error: {moviesError?.message}</Text>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieCard 
            {...item}            
            />
          )}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingHorizontal: 20,
            marginBottom: 10,
          }}
          className="mt-2 pb-32"
        />
      )}
    </View>
  );
}