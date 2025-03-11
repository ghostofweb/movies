export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string } = {}) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/movie/popular`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
};

export const fetchMovieDetails = async (movieId:string) =>{
  try {
    const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,{
      method:"GET",
      headers: TMDB_CONFIG.headers
    })
    if (!response.ok) {
      throw new Error("failed to get the data")
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
  }
}

export const fetchMultipleMovieDetails = async (movieIds: string[]): Promise<any[]> => {
  try {
    const moviePromises = movieIds.map((id) => fetchMovieDetails(id));
    const movies = await Promise.all(moviePromises);
    // Filter out any undefined or null responses
    return movies.filter((movie) => movie != null);
  } catch (error) {
    console.error("Failed to fetch multiple movie details:", error);
    return [];
  }
};
