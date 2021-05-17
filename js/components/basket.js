Vue.component('basket', {
  template: `
    <div id="basket" v-bind:class="{ show: $root.basketShow }">
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
      <button class="btn-close" @click="$root.basketShow = !$root.basketShow">X</button>
    </div>
  `
});

Vue.component('basket-items', {
  template: `
    <div class="basket-items">
      <div v-if="!$root.basket.countGoods">Корзина пуста</div>
      <basket-item 
        v-for="item in $root.basket.contents" 
        :item="item"
        :key="item.id_product"
      ></basket-item>
    </div>
  `
});

Vue.component('basket-item', {
  props: ['item'],
  template: `
    <div class="basket-item" >
      <div class="basket-image">
        <img :src="$root.basketGoodThumbnail" alt="">
      </div>
      <div class="basket-body">
        <h3 class="basket-item-title">{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
        <button class="btn-remove" @click="$root.removeBasketGood(item)">Удалить</button>
      </div>
      <div class="basket-quanity">{{ item.quantity }}</div>
    </div>
  `
});

Vue.component('basket-amount', {
  template: `<div class="basket-amount" v-if="$root.basket.amount">Товаров на сумму: {{ $root.basket.amount }}</div>`
});
