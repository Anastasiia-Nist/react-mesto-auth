import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";
import { useForm } from "../hooks/useForm";

export function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
}) {

  const app = React.useContext(AppContext);
  const {values, handleChange, setValues} = useForm({});
  React.useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.link,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={app.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__section">
        <input
          className="form__input form__input_avatar_link"
          id="avatar"
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
