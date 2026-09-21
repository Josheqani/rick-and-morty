import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { LoaderIcon } from "react-hot-toast";
import { getGenderIcon, getStatusClass } from "../utils/helpers";

const CharacterDetail = ({
  selectId,
  onAddFavourite,
  isFavourite,
  isAddToFavourute,
  onClose,
}) => {
  const isFav = isFavourite ?? isAddToFavourute;
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        setEpisodes([]);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectId}`,
          { signal }
        );
        setCharacter(data);

        const episodesId = (data.episode || [])
          .map((e) => e.split("/").pop())
          .filter(Boolean);

        if (episodesId.length > 0) {
          const { data: episodeData } = await axios.get(
            `https://rickandmortyapi.com/api/episode/${episodesId.join(",")}`,
            { signal }
          );
          const list = Array.isArray(episodeData) ? episodeData : [episodeData];
          setEpisodes(list.slice(0, 10));
        } else {
          setEpisodes([]);
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        const msg =
          error?.response?.data?.error ||
          error.message ||
          "Failed to load character details";
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectId) {
      fetchData();
    } else {
      setCharacter(null);
      setEpisodes([]);
      setIsLoading(false);
    }

    return () => {
      controller.abort();
    };
  }, [selectId]);

  if (isLoading) {
    return (
      <div className="character-detail-container loading">
        <div className="detail-loader">
          <LoaderIcon />
          <span>Loading character details...</span>
        </div>
      </div>
    );
  }

  if (!character || !selectId) {
    return (
      <div className="character-detail-container placeholder">
        <div className="detail-empty">
          <p className="detail-empty__icon">🔍</p>
          <p className="name">Please select a character</p>
          <p className="info">Choose from the list to view full profile & episodes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="character-detail-container">
      <CharacterSubInfo
        onAddFavourite={onAddFavourite}
        character={character}
        isFavourite={isFav}
        onClose={onClose}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
};

export default CharacterDetail;

const CharacterSubInfo = ({ onAddFavourite, character, isFavourite, onClose }) => {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail__img"
      />
      <div className="character-detail__info">
        <div className="character-detail__header">
          <h3 className="name">
            <span>{getGenderIcon(character.gender)}</span>
            <span>&nbsp;{character.name}</span>
          </h3>
          {onClose && (
            <button
              type="button"
              className="character-detail__close-btn"
              onClick={onClose}
              aria-label="Close details"
            >
              ✕
            </button>
          )}
        </div>
        <div className="info">
          <span className={`status ${getStatusClass(character.status)}`}></span>
          <span> {character.status} </span>
          <span> - {character.species}</span>
        </div>
        <div className="location">
          <p>Last known location:</p>
          <p>{character.location?.name || "Unknown"}</p>
        </div>
        <div className="actions">
          {isFavourite ? (
            <p className="favourite-badge">Already Added to Favourites ✔️</p>
          ) : (
            <button
              type="button"
              onClick={() => onAddFavourite(character)}
              className="btn btn--primary"
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({ episodes }) => {
  const [sortBy, setSortBy] = useState(true);

  if (!episodes || episodes.length === 0) {
    return (
      <div className="character-episodes">
        <div className="title">
          <h2>Episodes</h2>
        </div>
        <p className="info">No episodes available.</p>
      </div>
    );
  }

  const sortedEpisodes = [...episodes].sort((a, b) =>
    sortBy
      ? new Date(a.created) - new Date(b.created)
      : new Date(b.created) - new Date(a.created)
  );

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>Episodes</h2>
        <button
          type="button"
          onClick={() => setSortBy((is) => !is)}
          aria-label={sortBy ? "Sort newest first" : "Sort oldest first"}
          className="sort-btn"
        >
          <ArrowUpCircleIcon
            className="icon"
            style={{
              transform: sortBy ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </button>
      </div>
      <ul className="episodes-list">
        {sortedEpisodes.map((item, i) => (
          <li key={item.id} className="episodes-list__item">
            <div className="episodes-list__name">
              <span>{String(i + 1).padStart(2, "0")} {item.episode} :</span>{" "}
              <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
