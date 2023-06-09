import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { AppContext } from "../context/AppContext";
import { useForm } from "../hooks/useForm";

export function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const app = React.useContext(AppContext);
  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText={app.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className={`form__input form__input_type_name`}
          id="name"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          value={values.name || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <input
          className={`form__input form__input_type_career`}
          id="about"
          type="text"
          name="about"
          required
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          value={values.about || ''}
          onChange={handleChange}
        />
      </div>
    </PopupWithForm>
  );
}
