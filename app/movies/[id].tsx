import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFetch } from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id as string));

  const [bookmarked, setBookmarked] = useState(false);

  // Check if the movie is already bookmarked on mount
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarkedMovies");
        if (storedBookmarks) {
          const bookmarks = JSON.parse(storedBookmarks);
          if (bookmarks.includes(id)) {
            setBookmarked(true);
          }
        }
      } catch (e) {
        console.error("Error reading bookmarks", e);
      }
    };
    checkBookmarkStatus();
  }, [id]);

  // Toggle bookmark status
  const toggleBookmark = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem("bookmarkedMovies");
      let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];
      if (bookmarked) {
        // Remove bookmark
        bookmarks = bookmarks.filter((movieId: string) => movieId !== id);
        setBookmarked(false);
      } else {
        // Add bookmark
        bookmarks.push(id);
        setBookmarked(true);
      }
      await AsyncStorage.setItem("bookmarkedMovies", JSON.stringify(bookmarks));
    } catch (e) {
      console.error("Error updating bookmarks", e);
    }
  };

  // Helper function to format runtime (e.g., 120 min -> 2h 0m)
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Extract year from release_date
  const getYear = (date: string) => new Date(date).getFullYear();

  // Helper function to render rating stars (convert rating out of 10 to 5 stars)
  const renderStars = (rating: number) => {
    const starCount = Math.round(rating / 2);
    const stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);
    return stars;
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.posterImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(15, 13, 35, 0)", "rgba(15, 13, 35, 0.8)", "#0F0D23"]}
            style={styles.gradient}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>
              {movie.title} ({getYear(movie.release_date)})
            </Text>
          </View>
        </View>

        {/* Movie Information Section */}
        <View style={styles.infoContainer}>
          {movie.tagline ? (
            <Text style={styles.taglineText}>"{movie.tagline}"</Text>
          ) : null}
          <Text style={styles.overviewText}>{movie.overview}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.sectionHeader}>Details</Text>
            <Text style={styles.detailText}>Runtime: {formatRuntime(movie.runtime)}</Text>
            <Text style={styles.detailText}>
              Rating: {movie.vote_average.toFixed(1)}/10 {renderStars(movie.vote_average)}
            </Text>
            <Text style={styles.detailText}>
              Genres: {movie.genres.map((g: any) => g.name).join(", ")}
            </Text>
            <Text style={styles.detailText}>
              Original Language: {movie.original_language.toUpperCase()}
            </Text>
            <Text style={styles.detailText}>Release Date: {movie.release_date}</Text>
            {movie.status && (
              <Text style={styles.detailText}>Status: {movie.status}</Text>
            )}
            {movie.popularity && (
              <Text style={styles.detailText}>Popularity: {movie.popularity.toFixed(1)}</Text>
            )}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <Text style={styles.detailText}>
                Production: {movie.production_companies.map((pc: any) => pc.name).join(", ")}
              </Text>
            )}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <Text style={styles.detailText}>
                Languages: {movie.spoken_languages.map((lang: any) => lang.english_name).join(", ")}
              </Text>
            )}
            {movie.budget ? (
              <Text style={styles.detailText}>
                Budget: ${movie.budget.toLocaleString()}
              </Text>
            ) : null}
            {movie.revenue ? (
              <Text style={styles.detailText}>
                Revenue: ${movie.revenue.toLocaleString()}
              </Text>
            ) : null}
          </View>

          {/* Bookmark Button */}
          <View style={styles.bookmarkContainer}>
            <TouchableOpacity style={styles.bookmarkButton} onPress={toggleBookmark}>
              <Text style={styles.bookmarkButtonText}>
                {bookmarked ? "Remove Bookmark" : "Bookmark"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Go Back Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.goBackButton} onPress={() => router.back()}>
            <Text style={styles.goBackButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0D23",
  },
  scrollContent: {
    paddingBottom: 120,
  },
  centered: {
    flex: 1,
    backgroundColor: "#0F0D23",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 18,
  },
  heroContainer: {
    position: "relative",
  },
  posterImage: {
    width: "100%",
    height: 550,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%",
  },
  titleContainer: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 2,
  },
  titleText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.85)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    flexWrap: "wrap",
  },
  infoContainer: {
    marginTop: -40,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#0F0D23",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  taglineText: {
    color: "#fff",
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
    textAlign: "center",
  },
  overviewText: {
    color: "#ccc",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 10,
  },
  sectionHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 5,
  },
  bookmarkContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  bookmarkButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  bookmarkButtonText: {
    color: "#0F0D23",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  goBackButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  goBackButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default MovieDetails;
