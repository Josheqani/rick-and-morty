import { useState } from "react";
import {
  HeartIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { CharacterItem } from "./CharacterList";

const Navbar = ({ children }) => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="navbar__logo">
          <span className="navbar__logo-icon">🛸</span>
          <span className="navbar__logo-text">Rick & Morty</span>
        </div>
        {children}
      </nav>
    </header>
  );
};

export default Navbar;

export const FindCharacters = ({ numOfCharacters }) => {
  return (
    <div className="navbar__result">
      Found <strong>{numOfCharacters}</strong>{" "}
      {numOfCharacters === 1 ? "character" : "characters"}
    </div>
  );
};

export const Search = ({ query, setQuery }) => {
  return (
    <div className="search-wrapper">
      <MagnifyingGlassIcon className="search-icon" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-field"
        placeholder="Search characters..."
        aria-label="Search characters"
      />
      {query && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={() => setQuery("")}
          aria-label="Clear search"
        >
          <XMarkIcon className="icon-sm" />
        </button>
      )}
    </div>
  );
};

export const Favourites = ({ favourites, onDeleteFavourite }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal onOpen={setIsOpen} open={isOpen} title="Favorite Characters">
        {favourites.length === 0 ? (
          <div className="empty-state">
            <p className="name">No favorites added yet!</p>
            <p className="info">Select a character and click &quot;Add to Favourite&quot; to bookmark them here.</p>
          </div>
        ) : (
          <div className="favourites-list">
            {favourites.map((item) => (
              <CharacterItem key={item.id} item={item}>
                <button
                  type="button"
                  className="icon red"
                  onClick={() => onDeleteFavourite(item.id)}
                  aria-label={`Remove ${item.name} from favorites`}
                >
                  <TrashIcon />
                </button>
              </CharacterItem>
            ))}
          </div>
        )}
      </Modal>

      <button
        type="button"
        className="heart"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`View favorites (${favourites.length} saved)`}
      >
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
};
