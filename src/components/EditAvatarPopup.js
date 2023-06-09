import React from "react";
import PopupWithForm from "./PopupWithForm";
import { AppContext } from "../context/AppContext";

export function EditAvatarPopup({
  isOpen,
  onUpdateAvatar,
}) {
  //const avatarRef = React.useRef();
  const [link, setLink] = React.useState("");
  const [linkErrorMessage, setLinkErrorMessage] = React.useState("");
  const app = React.useContext(AppContext);

  React.useEffect(() => {
    setLink("");
    setLinkErrorMessage("");
  }, [isOpen]);

  //валидация

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: link,
    });
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
          value={link}
          onChange={handleChangeLink}
        />
        {linkErrorMessage && (
          <span className="form__input-error_active" id="avatar-error">
            {linkErrorMessage}
          </span>
        )}
      </div>
    </PopupWithForm>
  );
}
