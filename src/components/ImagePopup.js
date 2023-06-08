import React from "react";
import {usePopupClose} from "../hooks/usePopupClose";

function ImagePopup({card, onClose}) {
  usePopupClose(card.link, onClose);
  return (
    <section
      className={`popup popup-image ${card.name ? "popup_opened" : ""}`}
    >
      <div className="popup-image__container">
        <figure className="popup-image__figure">
          <img
            className="popup-image__large-image"
            alt={card.name}
            src={card.link}
          />
          <figcaption className="popup-image__title-image">
            {card.name}
          </figcaption>
        </figure>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Кнопка закрытия"
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
