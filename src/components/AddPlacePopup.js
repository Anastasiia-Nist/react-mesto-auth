import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";

export function AddPlacePopup({ isOpen, onAddPlace }) {
  const app = React.useContext(AppContext);
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  // валидация
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [linkErrorMessage, setLinkErrorMessage] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
    setNameErrorMessage("");
    setLinkErrorMessage("");
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    //валидация
    if (e.target.value.length < 2) {
      setNameErrorMessage(e.target.validationMessage);
    } else {
      setNameErrorMessage("");
    }
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    //валидация
    if (e.target.typeof !== "url") {
      setLinkErrorMessage(e.target.validationMessage);
    } else {
      setLinkErrorMessage("");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="cards"
      title="Новое место"
      buttonText={app.isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_card_name ${
            nameErrorMessage && "form__input_invalid"
          }`}
          id="place"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={name}
          onChange={handleChangeName}
        />
        {nameErrorMessage && (
          <span className="form__input-error_active" id="place-error">
            {nameErrorMessage}
          </span>
        )}
      </div>
      <div className="form__section">
        <input
          className={`form__input form__input_card_img ${
            linkErrorMessage && "form__input_invalid"
          }`}
          id="place__link"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={link}
          onChange={handleChangeLink}
        />
        {linkErrorMessage && (
          <span className="form__input-error_active" id="place__link-error">
            {linkErrorMessage}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
