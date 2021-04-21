import basket from './components/basket';
import error from './components/error';
import products from './components/products';
import search from './components/search';

const app = {
  el: '#app',
  components: {
    basket,
    error,
    products,
    search
  },
  methods: {
    /**
     * Получить json данные
     * @param {string} url - адрес
     * @returns {Promise}
     */
    get(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => this.$refs.error.text = error)
    },

    /**
     * Добавление json данные
     * @param {string} url - адрес
     * @param {object} data - объект данных
     * @returns {Promise}
     */
    add(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.text = error)
    },

    /**
     * Обновление json данных
     * @param {string} url - адрес
     * @param {object} data - объект данных
     * @returns {Promise}
     */
    update(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.text = error)
    },

    /**
     * Удалегние json данных
     * @param {string} url - адрес
     * @returns {Promise}
     */
     remove(url) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(result => result.json())
        .catch(error => this.$refs.error.text = error)
    }
  }
}

export default app;
