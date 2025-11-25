// import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  // const handleSearch = async (title: string) => {
  //   try {
  //     const data = await fetchMovies(title);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleMovie = (title: string) => {
    if (title === "") toast("Please enter your search query.");
  };
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
    </>
  );
}
