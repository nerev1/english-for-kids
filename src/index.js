import 'bootstrap';
import Card from './js/Card';
import Category from './js/Category';
import categories from './js/categories';
import cards from './js/cards';

const buttonSwitch = document.querySelector('.button-switch');
const switcher = buttonSwitch.querySelector('.switch');

/* Menu delegation */
function removeSelectedCategories() {
  const categoriesToUnselect = document.querySelectorAll('.nav-link');
  categoriesToUnselect.forEach((item) => {
    item.classList.remove('active');
  });
}

function addClickedCategory(clickedCategory) {
  clickedCategory.classList.add('active');
}

function addCategoriesClickHandler() {
  document.querySelector('.navbar-nav').addEventListener('click', (event) => {
    if (event.target.classList.contains('nav-link')) {
      const clickedCategory = event.target;
      removeSelectedCategories();
      addClickedCategory(clickedCategory);
    }
  });
}

// Hide menu
function hideMenu() {
  document.querySelector('.navbar-collapse').classList.remove('show');
}

function addHideMenuHandlers() {
  document.querySelector('main').addEventListener('click', hideMenu);
}


// Create cards objects
function fillCategoryList() {
  const categoryList = [];
  categories.forEach((category) => {
    categoryList.push(new Category(category));
  });
  return categoryList;
}

const categoryList = fillCategoryList();

function fillCategoriesWithCards() {
  for (let i = 0; i < cards.length; i += 1) {
    for (let j = 0; j < cards[i].length; j += 1) {
      categoryList[i].addCard(new Card(cards[i][j]));
    }
  }
}

/* Generate elements */
function generateMenu() {
  categoryList.forEach((item) => {
    document.querySelector('.navbar-nav').append(item.generateMenuItem());
  });
}

function displayMain() {
  const main = document.querySelector('.main__wrapper');
  main.innerHTML = '';
  categoryList.forEach((item) => {
    main.append(item.generateCategory());
  });
}

function displayCategoryCards(category) {
  if (category instanceof Category) {
    const main = document.querySelector('.main__wrapper');
    main.innerHTML = '';
    category.getCards().forEach((card) => {
      main.append(card.generateCard());
    });
  }
}

/* Switch category */
function addMenuCategorySwitch(event) {
  hideMenu();
  if (event.target.classList.contains('nav-link_main')) {
    displayMain();
    return;
  }
  if (event.target.classList.contains('nav-link')) {
    categoryList.forEach((category) => {
      if (category.getName() === event.target.innerText) {
        displayCategoryCards(category);
      }
    });
  }
}

function getDataByWord(name) {
  return categoryList.find((category) => category.name === name);
}

function handleCategorySwitch(event) {
  if (event.target.closest('.card_category')) {
    const clickedCategoryName = event.target.closest('.card_category').getAttribute('data-name');
    const clickedCategory = getDataByWord(clickedCategoryName);
    displayCategoryCards(clickedCategory);
  }
}

function addMenuClickHandler() {
  document.querySelector('.navbar-nav').addEventListener('click', addMenuCategorySwitch);
}

function addChangeCategoryHandler() {
  document.querySelector('.main__wrapper').addEventListener('click', handleCategorySwitch);
}

/* Card actions */
// rotation
function flipCard(event) {
  if (event.target.classList.contains('rotate-button')) {
    const card = event.target.closest('.card');
    card.classList.add('card_rotate');
  }
}

function flipCardBack(event) {
  if (event.target.classList.contains('rotate-button')) {
    const card = event.target.closest('.card');
    card.classList.remove('card_rotate');
  }
}

function addCardFlip() {
  document.querySelector('.main__wrapper').addEventListener('click', flipCard);
  document.querySelector('.main__wrapper').addEventListener('mouseout', flipCardBack);
}

function removeCardFlip() {
  document.querySelector('.main__wrapper').removeEventListener('click', flipCard);
  document.querySelector('.main__wrapper').removeEventListener('mouseout', flipCardBack);
}

// Play card audio
function playAudioHandler(event) {
  if (event.target.closest('.card') && (!event.target.classList.contains('rotate-button'))) {
    const card = event.target.closest('.card');
    card.querySelector('.card__audio').play();
  }
}


function addAudioPlay() {
  document.querySelector('.main__wrapper').addEventListener('click', playAudioHandler);
}

function removeAudioPlay() {
  document.querySelector('.main__wrapper').removeEventListener('click', playAudioHandler);
}

/* Play mode action */

function startPlay() {
  const cardsList = document.querySelectorAll('.card-container');
  const hiddenCopy = Array.from(cardsList).sort(() => Math.random() - 0.5);
  hiddenCopy.forEach((card) => {
    card.querySelector('.card__audio').play();
  });
}


/* Train and play mode */
function checkSwitcher() {
  switcher.classList.remove('switch_unchecked');
  switcher.classList.add('switch_checked');
  buttonSwitch.querySelector('.label-off').classList.add('label_hidden');
  buttonSwitch.querySelector('.label-on').classList.remove('label_hidden');
}

function uncheckSwitcher() {
  switcher.classList.remove('switch_checked');
  switcher.classList.add('switch_unchecked');
  buttonSwitch.querySelector('.label-on').classList.add('label_hidden');
  buttonSwitch.querySelector('.label-off').classList.remove('label_hidden');
}

function addMainPlayTheme() {
  const main = document.querySelector('.main');
  main.classList.add('main_play');
}
/*
function showRetryButton() {
  document.querySelector('.button_retry').classList.remove('button_hidden');
} */

function showPlayButton() {
  document.querySelector('.button_play').classList.remove('button_hidden');
}
/*
function hideRetryButton() {
  document.querySelector('.button_retry').classList.add('button_hidden');
}
*/
/*
function hidePlayButton() {
  document.querySelector('.button_play').classList.add('button_hidden');
} */

function removeMainPlayTheme() {
  const main = document.querySelector('.main');
  main.classList.remove('main_play');
}

function runTrainMode() {
  addChangeCategoryHandler();
  addCardFlip();
  addAudioPlay();
}

function runPlayMode() {
  removeCardFlip();
  removeAudioPlay();
  startPlay();
  showPlayButton();
}


/* Main */
window.onload = function () {
  switcher.addEventListener('change', () => {
    if (switcher.checked) {
      uncheckSwitcher();
      removeMainPlayTheme();
      runTrainMode();
      return;
    }
    checkSwitcher();
    addMainPlayTheme();
    runPlayMode();
  });


  generateMenu();
  fillCategoriesWithCards();
  addCategoriesClickHandler();
  displayMain();
  addMenuClickHandler();
  addHideMenuHandlers();
  runTrainMode();
};
