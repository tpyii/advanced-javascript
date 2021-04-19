Vue.component('basket', {
  data() {
    return {
      url: 'api/cart',
      basketShow: false,
      basketGoodThumbnail: 'https://via.placeholder.com/100',
      basket: {}
    }
  },
  mounted() {
    /** Получить список товаров в корзине */
    this.$root.get(this.url)
      .then(data => this.basket = data);
  },
  methods: {
    /** 
     * Добавить товар в корзину 
     * @param {object} good - объект товара
     */
    addBasketGood(good) {
      let basketGood = this.basket.contents.find(item => item.id_product === good.id_product);
      if (! basketGood) {
        basketGood = {
          ...good,
          quantity: 1
        }
        this.$root.add(this.url, basketGood)
          .then(response => {
            if (response.result === 1) {
              this.basket.contents.push(basketGood);
            }
          });
      } else {
        this.$root.update(`${this.url}/${basketGood.id_product}`, {quantity: 1})
          .then(response => {
            if (response.result === 1) {
              basketGood.quantity++;
            }
          });
      }
      this.calcBasket();
      this.basketShow = true;
    },

    /** 
     * Удалить товар из корзины 
     * @param {object} good - объект товара
     */
    removeBasketGood(good) {
      this.$root.remove(`${this.url}/${good.id_product}`)
        .then(response => {
          if (response.result === 1) {
            const product = this.basket.contents.find(item => item.id_product === good.id_product);
            if (product.quantity > 1) {
              product.quantity--;
            } else {
              this.basket.contents.splice(this.basket.contents.findIndex(item => item.id_product === good.id_product), 1);
            }
            this.calcBasket();
          }
        });
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
    }
  },
  template: `
    <div id="basket" v-bind:class="{ show: basketShow }">
      <basket-header></basket-header>
      <basket-items></basket-items>
      <basket-amount></basket-amount>
    </div>
  `
});

Vue.component('basket-header', {
  template: `
    <div class="basket-header">
      <h2>Корзина</h2>
      <button class="btn-close" @click="$parent.basketShow = false">X</button>
    </div>
  `
});

Vue.component('basket-items', {
  template: `
    <div class="basket-items">
      <div v-if="!$parent.basket.countGoods">Корзина пуста</div>
      <basket-item 
        v-for="item in $parent.basket.contents" 
        :item="item"
        :img="$parent.basketGoodThumbnail"
        :key="item.id_product"
      ></basket-item>
    </div>
  `
});

Vue.component('basket-item', {
  props: ['item', 'img'],
  template: `
    <div class="basket-item" >
      <div class="basket-image">
        <img :src="img" alt="">
      </div>
      <div class="basket-body">
        <h3 class="basket-item-title">{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <button class="btn-remove" @click="$root.$refs.basket.removeBasketGood(item)">Удалить</button>
      </div>
      <div class="basket-quanity">{{ item.quantity }}</div>
    </div>
  `
});

Vue.component('basket-amount', {
  template: `<div class="basket-amount" v-if="$parent.basket.amount">Товаров на сумму: {{ $parent.basket.amount }}</div>`
});
