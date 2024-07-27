// BUTTONS
const addNewCardButton = document.querySelector(".addBtn");
const editUserInfoButton = document.querySelector(".edit");

const submitUserBtn = document.querySelector(".submitUserBtn");
const submitBtn = document.querySelector(".submitBtn");
//===============================================================================================

// DOM Elements
const main = document.querySelector(".cardList");
const enlargeContainer = document.querySelector(".photoAndText");

// INPUTS USER
const forms = document.querySelectorAll(".formContainer");
const userDataForm = document.forms.userInfoModal;
const nameEditInput = userDataForm.elements.name;
const bioEditInput = userDataForm.elements.bio;
const photoEditInput = userDataForm.elements.photo;
const userNameElement = document.querySelector(".userName");
const userBioElement = document.querySelector(".userBio");
const userPhotoElement = document.querySelector(".userPhoto");

//INPUTS CARD
const cardDataForm = document.forms.cardInfoModal;
const cardTitleInput = cardDataForm.elements.cardDescription;
const cardPhotoInput = cardDataForm.elements.cardPhoto;
//===============================================================================================

const closeModal = () => {
  event.target.closest(".modalCover").classList.remove("modalOpened");
};
forms.forEach((form) => {
  form.addEventListener("click", (event) => {
    if (!event.target.closest(".closeBtn")) {
      event.stopPropagation();
    }
  });
});

const openModal = () => {
  const formId = event.target.dataset.form;
  const form = document.getElementById(formId);

  form.classList.add("modalOpened");

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
  main.appendChild(userCard);
  closeModal();
};

submitBtn.addEventListener("click", addUserCard);
addNewCardButton.addEventListener("click", openModal);
editUserInfoButton.addEventListener("click", openModal);
submitUserBtn.addEventListener("click", changeUserInfo);
