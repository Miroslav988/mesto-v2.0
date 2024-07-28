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

const checkValidation = (form, formBtn) => {
  if (form.checkValidity()) {
    formBtn.removeAttribute("disabled");
  } else {
    formBtn.setAttribute("disabled", "true");
  }
};
const closeModal = () => {
  event.target.closest(".modalCover").classList.remove("modalOpened");
  cardDataForm.reset();
  userDataForm.reset();
};

const openModal = () => {
  const formId = event.target.dataset.form;
  const form = document.getElementById(formId);
  form.classList.add("modalOpened");

  const overlay = document.querySelector(".modalOpened");
  overlay.addEventListener("click", closeModal);

  nameEditInput.value = userNameElement.textContent;
  bioEditInput.value = userBioElement.textContent;
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
  closeModal();

  enlargeBtn.addEventListener("click", enlargeUserCard);
  like.addEventListener("click", switchLikeStatus);
  deleteBtn.addEventListener("click", deleteUserCard);
};

const switchLikeStatus = () => {
  event.preventDefault();
  const like = event.target;
  like.classList.contains("active")
    ? like.classList.remove("active")
    : like.classList.add("active");
};

const deleteUserCard = () => {
  event.target.closest(".card").remove();
};

const enlargeUserCard = () => {
  const enlargeCard = event.target.closest(".card");
  const enlargeCardImg = enlargeCard.querySelector(".cardPhoto");
  let enlargedPhoto = enlargeCardImg.src;
  let enlargedDescription = enlargeCardImg.alt;

  const enlargePhotoModal = document.querySelector(".enlargedPhoto");
  const enlargeDescriptionModal = document.querySelector(".enlargedText");

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

submitBtn.addEventListener("click", addUserCard);
addNewCardButton.addEventListener("click", openModal);
editUserInfoButton.addEventListener("click", openModal);
submitUserBtn.addEventListener("click", changeUserInfo);
cardDataForm.addEventListener("input", () => {
  checkValidation(cardDataForm, submitBtn);
});
userDataForm.addEventListener("input", () => {
  checkValidation(userDataForm, submitUserBtn);
});
