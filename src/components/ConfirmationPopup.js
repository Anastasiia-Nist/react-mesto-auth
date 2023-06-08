import React from "react";
import {usePopupClose} from "../hooks/usePopupClose";
import PopupWithForm from "./PopupWithForm";

export function ConfirmationPopup({card, isOpen, onClose, onLoading, onDelete}) {
    usePopupClose(isOpen, onClose);
    function hendleDeleteCard(evt) {
        evt.preventDefault();
        onDelete(card);
    }
    return(
        <PopupWithForm  
        name='trash'
        title='Вы уверены?'
        buttonText={onLoading ? 'Удаление...' : 'Да'}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={hendleDeleteCard}>
        </PopupWithForm>
    )
}