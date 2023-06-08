import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // валидация
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [aboutErrorMessage, setAboutErrorMessage] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    setNameErrorMessage("");
    setAboutErrorMessage("");
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
    //валидация
    if (e.target.value.length < 2) {
      setNameErrorMessage(e.target.validationMessage);
    } else {
      setNameErrorMessage("");
    }
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    //валидация
    if (e.target.value.length < 2) {
      setAboutErrorMessage(e.target.validationMessage);
    } else {
      setAboutErrorMessage("");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={onLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_type_name ${
            nameErrorMessage && "form__input_invalid"
          }`}
          id="name"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={name}
          onChange={handleChangeName}
        />
        {nameErrorMessage && (
          <span className="form__input-error_active" id="name-error">
            {nameErrorMessage}
          </span>
        )}
      </div>
      <div className="form__section">
        <input
          className={`form__input form__input_type_career ${
            aboutErrorMessage && "form__input_invalid"
          }`}
          id="about"
          type="text"
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={description}
          onChange={handleChangeDescription}
        />
        {aboutErrorMessage && (
          <span className="form__input-error_active" id="about-error">
            {aboutErrorMessage}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
