import { useState } from "react";
import "./App.css";
import Navbar, {
  Favourites,
  FindCharacters,
  Search,
} from "./components/Navbar";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import toast, { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";

const App = () => {
  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );
  const [selectId, setSelectId] = useState(null);
  const [favourites, setFavourites] = useLocalStorage("FAVOURITE", []);

  const selectIdHandler = (id) => {
    setSelectId((prevId) => (prevId === id ? null : id));
  };

  const addFavouriteHandler = (char) => {
    setFavourites((prevFav) => {
      if (prevFav.some((fav) => fav.id === char.id)) {
        return prevFav;
      }
      return [...prevFav, char];
    });
    toast.success(`${char.name} added to favourites!`);
  };

  const deleteFavouriteHandler = (id) => {
    setFavourites((prevFav) => prevFav.filter((fav) => fav.id !== id));
    toast.success("Removed from favourites");
  };

  const isFavourite = favourites.some((fav) => fav.id === selectId);

  return (
    <div className="app">
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <FindCharacters numOfCharacters={characters.length} />
        <Favourites
          favourites={favourites}
          onDeleteFavourite={deleteFavouriteHandler}
        />
      </Navbar>

      <main className="main">
        <CharacterList
          characters={characters}
          selectId={selectId}
          isLoading={isLoading}
          onSelectId={selectIdHandler}
        />
        <CharacterDetail
          selectId={selectId}
          onAddFavourite={addFavouriteHandler}
          isFavourite={isFavourite}
          onClose={() => setSelectId(null)}
        />
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#f8fafc",
            border: "1px solid #334155",
          },
        }}
      />
    </div>
  );
};

export default App;
