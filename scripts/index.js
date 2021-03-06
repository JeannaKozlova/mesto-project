const addCardPopup = document.querySelector(".popup_join-card");
const profilePopup = document.querySelector(".popup_info");
const imagePopup = document.querySelector(".popup__kind_picture");
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const formProfileElement = profilePopup.querySelector('.profile-edit');
const nameInput = formProfileElement.querySelector('#name');
const descriptionInput = formProfileElement.querySelector('#description');
const cardTemplate = document.querySelector("#add-card").content;
const cards = document.querySelector(".cards");

function openPopupContainer(popup) {
    popup.classList.add("popup_opened");
}

function closePopupContainer(popup) {
    popup.classList.remove("popup_opened");
}

document.querySelector('.profile__editcard').addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileInfo.textContent;
    openPopupContainer(profilePopup);
});

profilePopup.querySelector('.popup__close').addEventListener('click', () => {
    closePopupContainer(profilePopup);
});


function editForm(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileInfo.textContent = descriptionInput.value;

    closePopupContainer(profilePopup);
}

formProfileElement.addEventListener('submit', editForm);

function createTemplateCard(data) {
    const cardInfo = cardTemplate.querySelector(".card").cloneNode(true);
    cardInfo.querySelector(".card__title").textContent = data.cardName;
    const cardImage = cardInfo.querySelector(".card__image");
    cardImage.src = data.cardLink;
    cardImage.alt = data.cardName;

    cardInfo
    .querySelector('.card__like').addEventListener('click', function (event){
        event.target.classList.toggle('card__like_active')
    });
    cardInfo
        .querySelector(".card__trash")
        .addEventListener("click", () => {
            cardInfo.remove();
        });

    cardInfo.querySelector(".card__image").addEventListener("click", () => {
        const popupImage = imagePopup.querySelector(".fullcard__picture");
        popupImage.src = data.cardLink;
        popupImage.alt = data.cardName;
        const popupCaption = imagePopup.querySelector(".fullcard__legend");
        popupCaption.textContent = data.cardName;

        openPopupContainer(imagePopup);
    });

    return cardInfo;
}

function addCardToEnd(data) {
    const newCard = createTemplateCard(data);
    cards.append(newCard);
}

function addCardToStart(data) {
    const newCard = createTemplateCard(data);
    cards.prepend(newCard);
}

const addCards = [
    {
        name: "??????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "?????????????????????? ??????????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "??????????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "????????????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "???????????????????????? ??????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "????????????",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

addCards.forEach((card) => {
    addCardToEnd({
        cardName: card.name,
        cardLink: card.link,
    });
});

document.querySelector(".profile__addcard").addEventListener("click", () => {
    openPopupContainer(addCardPopup);
});

addCardPopup
    .querySelector(".popup__close")
    .addEventListener("click", () => {
        closePopupContainer(addCardPopup);
    });

const newCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = newCardForm.querySelector(".popup__card-title");
const cardSrcInput = newCardForm.querySelector(".popup__card-src");

function addCardFormSubmit(evt) {
    evt.preventDefault();

    const cardNameInputValue = cardNameInput.value;
    const cardSrcInputValue = cardSrcInput.value;

    addCardToStart({
        cardName: cardNameInputValue,
        cardLink: cardSrcInputValue,
    });


    closePopupContainer(addCardPopup);


    newCardForm.reset();
}


newCardForm.addEventListener("submit", addCardFormSubmit);


imagePopup
    .querySelector(".popup__close")
    .addEventListener("click", () => {
        closePopupContainer(imagePopup);
    });