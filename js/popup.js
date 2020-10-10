'use strict';

(() => {

  const {setupUserName, userDialog, wizardCoat, wizardEyes,
    wizardFireball, setupOpen, setupClose, dialogHandle, onSuccessSubmit, onError, userForm} = window.elements;
  const {getWizardCoatColor, getWizardEyesColor, getFireballColor} = window.colorize;
  const {isEscEvent, isEnterEvent} = window.util;
  const {moveOn} = window.move;
  const {save} = window.backend;

  // Модальное окно
  const onPopupEscPress = (evt) => {
    if (!setupUserName.matches(`:focus`)) {
      isEscEvent(evt, closePopup);
    }
  };

  const openPopup = () => {
    userDialog.classList.remove(`hidden`);

    document.addEventListener(`keydown`, onPopupEscPress);
    wizardCoat.addEventListener(`click`, getWizardCoatColor);
    wizardEyes.addEventListener(`click`, getWizardEyesColor);
    wizardFireball.addEventListener(`click`, getFireballColor);
  };

  const closePopup = () => {
    userDialog.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
    wizardCoat.removeEventListener(`click`, getWizardCoatColor);
    wizardEyes.removeEventListener(`click`, getWizardEyesColor);
    wizardFireball.removeEventListener(`click`, getFireballColor);
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    isEnterEvent(evt, closePopup);
  });

  // Перетаскивание модального окна
  dialogHandle.addEventListener(`mousedown`, (evt) => {
    moveOn(evt);
  });

  // функция отправки данных формы на сервер
  const onFormSubmit = (evt) => {
    save(new FormData(userForm), onSuccessSubmit, onError);
    evt.preventDefault();
  };

  // добавление обработчика на отправку формы
  userForm.addEventListener(`submit`, onFormSubmit);

})();
