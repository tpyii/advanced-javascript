/** Класс гамбургера */
class Hamburger {
  /**
   * Конструктор гамбургера 
   * @param {Object} size - Обьект гамбургера
   * @param {string} size.title - Размер гамбургера
   * @param {number} size.price - Стоимость гамбургера
   * @param {number} size.calories - Калорийность гамбургера
   * @param {Array} stuffing - Список начинок
   * @param {string} stuffing[].title - Заголовок начинки
   * @param {number} stuffing[].price - Стоимость начинки
   * @param {number} stuffing[].calories - Калорийность начинки
   */
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    this.topping = [];
  }

  /**
   * Добавить дополнительный ингредиент
   * @param {Object} topping - Объект ингредиента
   * @param {string} topping.title - Заголовок ингредиента
   * @param {number} topping.price - Стоимость ингредиента
   * @param {number} topping.calories - Калорийность ингредиента
   */
  addTopping(topping) {
    this.topping.push(topping);
  }

  /**
   * Удалить дополнительный ингредиент
   * @param {Object} topping -  Объект ингредиента
   * @param {string} topping.title - Заголовок ингредиента
   * @param {number} topping.price - Стоимость ингредиента
   * @param {number} topping.calories - Калорийность ингредиента
   */
  removeTopping(topping) {
    this.topping.splice(this.topping.findIndex(item => item === topping), 1);
  }

  /**
   * Получить дополнительные ингредиенты
   * @returns {Array} Список дополнительных ингредиентов
   */
  getToppings() {
    return this.topping;
  }

  /**
   * Получить размер гамбургера
   * @returns {string} Размер гамбургера
   */
  getSize() {
    return this.size.title;
  }

  /**
   * Получить список начинок
   * @returns {Array} Список начинок
   */
  getStuffing() {
    return this.stuffing;
  }

  /**
   * Посчитать стоимость
   * @returns {number} Стоимость гамбургера
   */
  calculatePrice() {
    return [{...this.size}, ...this.stuffing, ...this.topping].reduce((total, item) => total + item.price, 0);
  }

  /**
   * Посчитать калорийность
   * @returns {number} Калорийность гамбургера
   */
  calculateCalories() {
    return [{...this.size}, ...this.stuffing, ...this.topping].reduce((total, item) => total + item.calories, 0);
  }
}

let burger = new Hamburger(
  {title: 'Маленький', price: 50, calories:20},
  [
    {title: 'С сыром', price: 10, calories: 20},
    {title: 'С салатом', price: 20, calories: 5}
  ]
);
