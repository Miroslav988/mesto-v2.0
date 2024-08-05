// BUTTONS
const addNewCardButton = document.querySelector(".addBtn");
const editUserInfoButton = document.querySelector(".edit");

const submitBtn = document.querySelectorAll(".submitButton");

// DOM Elements
const main = document.querySelector(".cardList");
const enlargeContainer = document.querySelector(".photoAndText");

const enlargePhotoModal = document.querySelector(".enlargedPhoto");
const enlargeDescriptionModal = document.querySelector(".enlargedText");
// INPUTS USER
const forms = document.querySelectorAll(".formContainer");
const userDataForm = document.forms.userInfoModal;

const nameEditInput = userDataForm.elements.name;
const bioEditInput = userDataForm.elements.bio;
const photoEditInput = userDataForm.elements.photo;

const userNameElement = document.querySelector(".userName");
const userBioElement = document.querySelector(".userBio");
const userPhotoElement = document.querySelector(".userPhoto");

// INPUTS CARD
const cardDataForm = document.forms.cardInfoModal;
const cardTitleInput = cardDataForm.elements.cardDescription;
const cardPhotoInput = cardDataForm.elements.cardPhoto;

//===============================================================================================

const checkValidation = (form) => {
  if (form.checkValidity()) {
    submitBtn.forEach((btn) => btn.removeAttribute("disabled"));
  } else {
    submitBtn.forEach((btn) => btn.setAttribute("disabled", "true"));
  }
};

const closeModal = () => {
  event.target.closest(".modalCover").classList.remove("modalOpened");
  forms.forEach((form) => form.reset());
};

const openModal = () => {
  const formId = event.target.dataset.form;
  const form = document.getElementById(formId);
  form.classList.add("modalOpened");

  const overlay = document.querySelector(".modalOpened");
  overlay.addEventListener("click", closeModal);

  nameEditInput.value = userNameElement.textContent;
  bioEditInput.value = userBioElement.textContent;
  submitBtn.forEach((btn) => btn.setAttribute("disabled", "true"));
};

const openModalEnlarge = () => {
  const enlargeContainer = document.getElementById("enlargeContainer");
  enlargeContainer.classList.add("modalOpened");

  const overlay = document.querySelector(".modalOpened");
  overlay.addEventListener("click", closeModal);
};

const changeUserInfo = () => {
  event.preventDefault();
  userNameElement.textContent = nameEditInput.value;
  userBioElement.textContent = bioEditInput.value;
  userPhotoElement.src = photoEditInput.value;
  closeModal();
};

const createNewCard = (name, photo) => {
  const template = document.querySelector(".newUserCard");
  const newCard = template.content.cloneNode(true);

  newCard.querySelector(".cardName").textContent = name;
  newCard.querySelector(".cardPhoto").alt = name;
  newCard.querySelector(".cardPhoto").src = photo;

  return newCard;
};

const addUserCard = () => {
  event.preventDefault();
  const title = cardTitleInput.value;
  const photo = cardPhotoInput.value;
  const userCard = createNewCard(title, photo);
  const deleteBtn = userCard.querySelector(".delete");
  const like = userCard.querySelector(".like");
  const enlargeBtn = userCard.querySelector(".enlarge");
  main.appendChild(userCard);

  const deleteUserCard = () => event.target.closest(".card").remove();
  enlargeBtn.addEventListener("click", enlargeUserCard);
  like.addEventListener("click", switchLikeStatus);
  deleteBtn.addEventListener("click", deleteUserCard);
  closeModal();
};

const switchLikeStatus = () => {
  event.preventDefault();
  const like = event.target.classList;
  like.contains("active") ? like.remove("active") : like.add("active");
};

const enlargeUserCard = () => {
  const enlargeCard = event.target.closest(".card");
  const enlargeCardImg = enlargeCard.querySelector(".cardPhoto");
  let enlargedPhoto = enlargeCardImg.src;
  let enlargedDescription = enlargeCardImg.alt;

  enlargePhotoModal.src = enlargedPhoto;
  enlargePhotoModal.alt = enlargedDescription;
  enlargeDescriptionModal.textContent = enlargedDescription;

  openModalEnlarge();
};

forms.forEach((form) => {
  form.addEventListener("click", (event) => {
    if (!event.target.closest(".closeBtn")) {
      event.stopPropagation();
    }
  });
});

// сабмиты форм, привызянные к кнопкам

const submitOpenedForm = (btnId) => {
  switch (btnId) {
    case "userInfoModal":
      changeUserInfo();
      break;
    case "cardInfoModal":
      addUserCard();
      break;
  }
};

addNewCardButton.addEventListener("click", openModal);
editUserInfoButton.addEventListener("click", openModal);
cardDataForm.addEventListener("input", () => {
  checkValidation(cardDataForm);
});
userDataForm.addEventListener("input", () => {
  checkValidation(userDataForm);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const modalOpened = document.querySelector(".modalOpened");
    if (modalOpened) {
    }
  }
});
submitBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentBtn = event.target;
    const btnId = currentBtn.dataset.action;
    event.preventDefault();
    submitOpenedForm(btnId);
  });
});
//
cardDataForm.addEventListener("keydown", (event) => {
  const modalOpened = document.querySelector(".modalOpened");
  if (event.key === "Enter") {
    event.preventDefault();
  }
});
