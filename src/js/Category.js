import Card from './Card';

class Category {
  constructor({ name, imageUrl }) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.cards = [];
  }

  generateCategory() {
    let template = '';
    const container = document.createElement('div');
    container.className = 'card-container';
    const categoryCard = document.createElement('div');
    categoryCard.className = 'card card_category main__card';
    categoryCard.setAttribute('data-name', this.name);

    if (this.imageUrl) {
      template += `<img class="card__image" src="${this.imageUrl}" alt="Card image">`;
    }
    if (this.name) {
      template += `<h4 class="card__header">${this.name}</h4>`;
    }
    categoryCard.innerHTML = template;
    container.append(categoryCard);
    return container;
  }

  generateMenuItem() {
    const menuItem = document.createElement('li');
    menuItem.className = 'nav-item';
    menuItem.innerHTML = `<a class="nav-link" href="#">${this.name}</a>`;
    return menuItem;
  }

  addCard(card) {
    if (card instanceof Card) {
      this.cards.push(card);
    }
  }

  getCards() {
    return this.cards;
  }

  getName() {
    return this.name;
  }
}

export default Category;
