import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useForm } from "../hooks/useForm";

export function AddPlacePopup({ isOpen, onAddPlace }) {
  const app = React.useContext(AppContext);
  const {values, handleChange, setValues} = useForm({});

  React.useEffect(() => {
    setValues({})

  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
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
          className={`form__input form__input_card_name`}
          id="place"
          type="text"
          name="name"
          required
          minLength="2"
          maxLength="30"
          placeholder="Название"
          value={values.name || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form__section">
        <input
          className={`form__input form__input_card_img `}
          id="place__link"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          value={values.link || ''}
          onChange={handleChange}
        />
      </div>
    </PopupWithForm>
  );
}
