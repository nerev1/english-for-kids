class Card {
  constructor({
    word, translation, imageUrl, audioUrl,
  }) {
    this.word = word;
    this.translation = translation;
    this.imageUrl = imageUrl;
    this.audioUrl = audioUrl;
  }

  generateFrontCard() {
    let template = '';
    const frontCard = document.createElement('div');
    frontCard.className = 'card__side card__side_front';
    template += '<span class="rotate-button"></span>';
    if (this.imageUrl) {
      template += `<img class="card__image" src="${this.imageUrl}" alt="Card image">`;
    }
    if (this.word) {
      template += `<h4 class="card__header">${this.word}</h4>`;
    }
    template += `<audio class="card__audio"><source src="${this.audioUrl}"></source></audio>`;
    frontCard.innerHTML = template;
    return frontCard;
  }

  generateBackCard() {
    let template = '';
    const backCard = document.createElement('div');
    backCard.className = 'card__side card__side_back';

    template += '<span class="rotate-button"></span>';
    if (this.imageUrl) {
      template += `<img class="card__image" src="${this.imageUrl}" alt="Card image">`;
    }
    if (this.translation) {
      template += `<h4 class="card__header">${this.translation}</h4>`;
    }
    template += `<audio class="card__audio"><source src="${this.audioUrl}"></source></audio>`;
    backCard.innerHTML = template;
    return backCard;
  }

  generateCard() {
    const container = document.createElement('div');
    container.className = 'card-container';
    const card = document.createElement('div');
    card.className = 'card';
    container.append(card);
    const frontSide = this.generateFrontCard();
    const backSide = this.generateBackCard();
    card.setAttribute('data-word', this.word);
    card.append(frontSide);
    card.append(backSide);
    return container;
  }
}

export default Card;
