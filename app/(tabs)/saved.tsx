import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { fetchMovieDetails } from "@/services/api";
import MovieCard from "@/components/MovieCard";

export const Saved = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Function to load bookmarks
  const loadBookmarks = async () => {
    try {
      const stored = await AsyncStorage.getItem("bookmarkedMovies");
      if (stored) {
        const movieIds: string[] = JSON.parse(stored);
        if (movieIds.length > 0) {
          const movies = await Promise.all(
            movieIds.map((id) => fetchMovieDetails(id))
          );
          return movies
            .filter((m) => m != null)
            .map((m) => ({
              ...m,
              genres: m.genres?.map((g: { id: number; name: string }) => g.name) || []
            }));
        }
      }
      return [];
    } catch (error) {
      console.error("Error fetching bookmarks", error);
      return [];
    }
  };

  // Function to refresh bookmarks manually
  const handleRefresh = async () => {
    setRefreshing(true);
    const movies = await loadBookmarks();
    setBookmarkedMovies(movies);
    setRefreshing(false);
  };

  // Load bookmarks when component is mounted
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      const movies = await loadBookmarks();
      setBookmarkedMovies(movies);
      setLoading(false);
    };
    initializeData();
  }, []);

  // Refresh bookmarks when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const refreshOnFocus = async () => {
        const movies = await loadBookmarks();
        setBookmarkedMovies(movies);
      };
      refreshOnFocus();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (bookmarkedMovies.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>No bookmarks found 🌠</Text>
        <Text style={styles.hintText}>Save movies to see them here!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <FlatList
        data={bookmarkedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          item && typeof item === "object" ? <MovieCard {...item} /> : null
        )}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#FFD700"]}
            tintColor="#FFD700"
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#FFF",
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#030014",
    paddingTop: 16,
  },
  centered: {
    flex: 1,
    backgroundColor: "#030014",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  emptyText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
  },
  hintText: {
    color: "#666",
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingBottom: 120,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
});

export default Saved;
