import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const getDefaultMovie = (): Movie => {
    return {
      id: -1,
      poster_path: "",
      backdrop_path: "",
      title: "",
      overview: "",
      release_date: "",
      vote_average: 0,
    };
  };
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<Movie>(getDefaultMovie());

  const handleSearch = async (title: string) => {
    try {
      setMovies([]);
      setIsError(false);
      setIsLoading(true);
      const data = await fetchMovies(title);

      if (data.length === 0) {
        toast("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovie = (title: string) => {
    handleSearch(title);
  };

  const openModal = (event: React.MouseEvent<HTMLUListElement>) => {
    const targetElement = event.target as HTMLElement;
    const card = targetElement.closest("li");
    if (card !== null) {
      const movieID = Number(card.id);
      if (movieID)
        setCurrentMovie(
          movies.find((movie) => movie.id === movieID) ?? getDefaultMovie()
        );
    }
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <SearchBar onSubmit={handleMovie} />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #0a66c2",
            padding: "4px 8px",
            color: "#0a66c2",
            fontSize: "20px",
          },
        }}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={openModal} movies={movies} />}
      {isModalOpen && <MovieModal movie={currentMovie} onClose={closeModal} />}
    </>
  );
}
