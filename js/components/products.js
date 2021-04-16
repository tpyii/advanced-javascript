Vue.component('products', {
  template: `
    <div class="products">
      <div v-if="!$root.goods.length">Нет данных</div>
      <product-item 
        v-for="item in $root.filteredGoods" 
        :item="item"
        :key="item.id_product"
      ></product-item>
    </div>
  `
});

Vue.component('product-item', {
  props: ['item'],
  template: `
    <div class="product-item">
      <img :src="$root.goodsThumbnail" alt="">
      <h3>{{ item.product_name }}</h3>
      <p>{{ item.price }}</p>
      <button class="btn-buy" @click="$root.addBasketGood(item)">Купить</button>
    </div>
  `
});
