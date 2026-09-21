import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { getGenderIcon, getStatusClass } from "../utils/helpers";

const CharacterList = ({ characters, isLoading, onSelectId, selectId }) => {
  if (isLoading) {
    return (
      <div className="characters-list">
        <div className="loading-state">
          <div className="spinner"></div>
          <p className="name">Loading characters...</p>
        </div>
      </div>
    );
  }

  if (!characters || characters.length === 0) {
    return (
      <div className="characters-list">
        <div className="empty-state">
          <p className="info">No characters found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <CharacterItem
          key={item.id}
          item={item}
          isSelected={selectId === item.id}
          onSelect={() => onSelectId(item.id)}
        >
          <button
            type="button"
            className="icon red"
            onClick={(e) => {
              e.stopPropagation();
              onSelectId(item.id);
            }}
            aria-label={
              selectId === item.id
                ? `Close details for ${item.name}`
                : `View details for ${item.name}`
            }
          >
            {selectId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </CharacterItem>
      ))}
    </div>
  );
};

export const CharacterItem = ({ item, children, isSelected, onSelect }) => {
  return (
    <div
      className={`list__item ${isSelected ? "list__item--active" : ""}`}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="list-item__img"
      />
      <h3 className="name">
        <span>{getGenderIcon(item.gender)}</span>
        <span> {item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span className={`status ${getStatusClass(item.status)}`}></span>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </div>
      {children}
    </div>
  );
};

export default CharacterList;
