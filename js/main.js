const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    goodsThumbnail: 'https://via.placeholder.com/200',
    goods: [],
    filteredGoods: [],
    searchValue: '',
    basketShow: false,
    basketGoodThumbnail: 'https://via.placeholder.com/100',
    basket: {},
    error: false
  },
  methods: {
    /**
     * Получить json данные
     * @param {string} url - адрес
     * @returns {Promise}
     */
    fetch(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => this.error = error)
    },

    /** Фильтр товаров по имени */
    filterGoods() {
      const regexp = new RegExp(this.searchValue, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    },

    /** Добавить товар в корзину */
    addBasketGood(good) {
      const basketGood = this.getBasketGood(good.id_product);
      if (! basketGood) {
        this.basket.contents.push({
          ...good,
          quantity: 1
        });
      } else {
        this.basket.contents.map(item => {
          if (item.id_product === basketGood.id_product) {
            item.quantity += 1;
            return item;
          }
          return item;
        });
      }
      this.calcBasket();
      this.basketShow = true;
    },

    /** Удалить товар из корзины */
    removeBasketGood(good) {
      this.basket.contents = this.basket.contents.filter(item => item.id_product !== good.id_product);
      this.calcBasket();
    },

    /** Пересчитать количество товаров и стоимость в корзине */
    calcBasket() {
      this.calcAmount();
      this.basketCountGoods();
    },

    /** Пересчитать стоимость товаров в корзине */
    calcAmount() {
      this.basket.amount = this.basket.contents.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    /** Пересчитать количество товаров в корзине */
    basketCountGoods() {
      this.basket.countGoods = this.basket.contents.reduce((total, item) => total + item.quantity , 0);
    },

    /** 
     * Получить товар в корзине по id 
     * @param {number} id - идентификатор товара
     * @returns {object}
     */
    getBasketGood(id) {
      return this.basket.contents.find(item => item.id_product === id);
    }
  },
  mounted() {
    /** Плучить список товаров */
    this.fetch(`${API}/catalogData.json`)
      .then(data => {
        this.goods = data;
        this.filteredGoods = data;
      });

    /** Получить список товаров в корзине */
    this.fetch(`${API}/getBasket.json`)
      .then(data => this.basket = data);
  }
});

/** Класс списка товаров */
class GoodsList {
  /**
   * Конструктор списока товаров
   * @param {Element} container - Контейнер
   */
  constructor(container = document.querySelector('.products')) {
    this.container = container;
    this.goods = [];
    this._fetchGoods()
      .then(data => {
        if (data.length) {
          this.goods = data.map(item => new GoodItem(item));
        }
        this.render();
        this._addEventListener();
      })
  }

  /** Повесить обработчики */
  _addEventListener() {
    document.querySelectorAll('.btn-buy').forEach(item => {
      item.addEventListener('click', event => {
        const good = this.goods.find(item => item.id_product === +event.target.parentElement.dataset.id);
        basket.addGood(good);
      });
    });
  }

  /** 
   * Получить список товаров 
   * @returns {Promise}
   */
  _fetchGoods() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => console.log(error))
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
    this.goods.forEach(item => this.container.insertAdjacentHTML('beforeend', item.render()));
  }
}

/** Класс товара */
class GoodItem {
  /**
   * Конструктор товара
   * @param {Object} product - Обьект товара
   * @param {number} product.id_product - Идентификатор товара
   * @param {string} product.product_name - Заголовок товара
   * @param {number} product.price - Цена товара
   * @param {number} product.quantity - Количество товара
   * @param {string} img - Путь к изображению товара
   */
  constructor(product, img = 'https://via.placeholder.com/200') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.quantity = 1;
    this.img = img;
  }

  /** 
   * Отрисовать товар
   * @returns {string} Шаблон товара
   */
  render() {
    return `<div class="product-item" data-id="${this.id_product}">
        <img src="${this.img}" alt="">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="btn-buy">Купить</button>
      </div>`;
  }
}

/** Класс корзины */
class Cart {
  /** Конструктор корзины */
  constructor() {
    this.container = document.querySelector('#basket');
    this.containerItems = this.container.querySelector('.basket-items');
    this.containerAmount = this.container.querySelector('.basket-amount');
    this.buttonCloseCart = this.container.querySelector('.btn-close');
    this.buttonOpenCart = document.querySelector('.btn-cart');
    this.amount = 0;
    this.countGoods = 0;
    this.contents = [];
    this._fetchGoods()
      .then(data => {
        if (data.contents.length) {
          this.contents = data.contents.map(item => new CartItem(item));
        }
        this._calcAll();
      });
  }

  /** Повесить обработчики */
  _addEventListener() {
    this.buttonOpenCart.addEventListener('click', () => this.show());
    this.buttonCloseCart.addEventListener('click', () => this.hide());
    document.querySelectorAll('.btn-remove').forEach(item => {
      item.addEventListener('click', event => this.removeGood(+event.target.parentElement.parentElement.dataset.id));
    });
  }

  /**
   * Получить список товаров
   * @returns {Promise}
   */
  _fetchGoods() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => console.log(error));
  }

  /** Пересчитать корзину */
  _calcAll() {
    this._calcAmount();
    this._calcCountGoods();
    this.render();
  }

  /** Пересчитать сумму корзины */
  _calcAmount() {
    this.amount = this.contents.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  /** Пересчитать количество товаров */
  _calcCountGoods() {
    this.countGoods = this.contents.reduce((total, item) => total + item.quantity, 0);
  }

  /** Отрисовать товары, если они есть */
  _renderItems() {
    if (this.contents.length) {
      this.containerItems.innerHTML = '';
      this.contents.forEach(item => this.containerItems.insertAdjacentHTML('beforeend', item.render()));
    } else {
      this.containerItems.innerText = 'Корзина пуста';
    }
  }

  /** Отрисовать сумму корзины */
  _renderAmount() {
    this.containerAmount.innerText = this.amount > 0 ? `Товаров на сумму: ${this.amount}` : '';
  }

  /**
   * Получить товар корзины
   * @param {number} id - Идентификатор товара
   * @returns {Object|undefined}
   */
  getGood(id) {
    return this.contents.find(item => item.id_product === id);
  }

  /**
   * Добавить товар в корзину
   * @param {Object} product - Объект товара
   */
  addGood(product) {
    const good = this.getGood(product.id_product);
    if (! good) {
      this.contents.push(new CartItem(product));
    } else {
      good.quantity += product.quantity;
    }
    this._calcAll();
    this.show();
  }
  
  /**
   * Удалить товар из корзины
   * @param {number} id - Идентификатор товара
   */
  removeGood(id) {
    this.contents = this.contents.filter(item => item.id_product !== id);
    this._calcAll();
  }

  /** Показать корзину */
  show() {
    this.container.classList.add('show');
  }

  /** Скрыть корзину */
  hide() {
    this.container.classList.remove('show');
  }
  
  /** Отрисовать корзину */
  render() {
    this._renderItems();
    this._renderAmount();
    this._addEventListener();
  }
}

/** Класс товара корзины */
class CartItem {
  /**
   * Конструктор товара корзины
   * @param {Object} product - Объект товара
   * @param {number} product.id_product - Идентификатор товара
   * @param {string} product.product_name - Заголовок товара
   * @param {number} product.price - Цена товара
   * @param {number} product.quantity - Количество товара
   * @param {string} img - Путь к изображению товара
   */
  constructor(product, img = 'https://via.placeholder.com/100') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.quantity = product.quantity;
    this.img = img;
  }

  /** 
   * Отрисовать товар корзины
   * @returns {string} Шаблон товара корзины
   */
  render() {
    return `<div class="basket-item" data-id="${this.id_product}">
      <div class="basket-image">
        <img src="${this.img}" alt="">
      </div>
      <div class="basket-body">
        <h3 class="basket-item-title">${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="btn-remove">Удалить</button>
      </div>
      <div class="basket-quanity">${this.quantity}</div>
    </div>`;
  }
}

// let list = new GoodsList;
// let basket = new Cart;
