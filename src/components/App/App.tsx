// import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";

export default function App() {
  // const handleSearch = async (title: string) => {
  //   try {
  //     const data = await fetchMovies(title);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleMovie = (title: string) => {
    console.log("movie:", title);
  };
  return (
    <>
      <SearchBar onSubmit={handleMovie} />
    </>
  );
}
