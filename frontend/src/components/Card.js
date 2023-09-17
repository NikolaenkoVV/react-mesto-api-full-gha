import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ place, onCardClick, onCardLike, onCardDelete }) {
  const handleClick = () => {
    onCardClick(place);
  };

  const handleDeleteClick = () => {
    onCardDelete(place);
  };

  const handleLikeClick = () => {
    onCardLike(place);
  };

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = place.owner === currentUser._id;
  const isLiked = place.likes.some((i) => i._id === currentUser._id);

  return (
    <article className="place">
      {isOwn && (
        <button
          className="place__button-trash"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        src={place.link}
        alt={place.name}
        className="place__picture"
        onClick={handleClick}
      />
      <div className="place__title-box">
        <h2 className="place__title">{place.name}</h2>
        <div className="place__like-wrapper">
          <button
            type="button"
            className={
              isLiked
                ? "place__button-like place__button-like_action"
                : "place__button-like"
            }
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-counter">{place.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
