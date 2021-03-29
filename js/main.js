/** Класс списка товаров */
class GoodsList {
  /**
   * Конструктор списока товаров
   * @param {Element} container - Контейнер
   */
  constructor(container = document.querySelector('.products')) {
    this.container = container;
    this.goods = [];
    this._fetchGoods();
  }

  /** Получить список товаров */
  _fetchGoods() {
    this.goods = [
      {id: 1, title: 'Notebook', price: 2000},
      {id: 2, title: 'Mouse', price: 20},
      {id: 3, title: 'Keyboard', price: 200},
      {id: 4, title: 'Gamepad', price: 50},
    ];
  }

  /**
   * Посчитать суммарную стоимость всех товаров
   * @returns {number} Суммарная стоимость всех товаров
   */
   calculatePrice() {
    return this.goods.reduce((total, item) => total + item.price, 0);
  }

  /** Отрисовать список товаров */
  render() {
    this.goods.forEach(item => this.container.insertAdjacentHTML('beforeend', new GoodItem(item).render()));
  }
}

/** Класс товара */
class GoodItem {
  /**
   * Конструктор товара
   * @param {Object} product - Обьект товара
   * @param {number} product.id - Идентификатор товара
   * @param {string} product.title - Заголовок товара
   * @param {number} product.price - Цена товара
   * @param {string} img - Путь к изображению товара
   */
  constructor(product, img = 'https://via.placeholder.com/200') {
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = img;
  }

  /** 
   * Отрисовать товар
   * @returns {string} Шаблон товара
   */
  render() {
    return `<div class="product-item" data-id="${this.id}">
        <img src="${this.img}" alt="">
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        <button class="btn-buy">Купить</button>
      </div>`;
  }
}

class Cart {}
class CartItem {}

let list = new GoodsList;
list.render();
