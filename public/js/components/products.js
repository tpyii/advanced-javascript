Vue.component('products', {
  data() {
    return {
      url: 'api/products',
      goodsThumbnail: 'https://via.placeholder.com/200',
      goods: [],
      filteredGoods: [],
    }
  },
  mounted() {
    /** Плучить список товаров */
    this.$root.get(this.url)
      .then(data => {
        this.goods = data;
        this.filteredGoods = data;
      });
  },
  methods: {
    /** 
     * Фильтр товаров по имени 
     * @param {string} searchValue - текст для поиска
     */
    filterGoods(searchValue) {
      const regexp = new RegExp(searchValue, 'i');
      this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
    }
  },
  template: `
    <div class="products">
      <div v-if="!goods.length">Нет данных</div>
      <product-item 
        v-for="item in filteredGoods" 
        :item="item"
        :img="goodsThumbnail"
        :key="item.id_product"
      ></product-item>
    </div>
  `
});

Vue.component('product-item', {
  props: ['item', 'img'],
  template: `
    <div class="product-item">
      <img :src="img" alt="">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button class="btn-buy" @click="$root.$refs.basket.addBasketGood(item)">Купить</button>
    </div>
  `
});
