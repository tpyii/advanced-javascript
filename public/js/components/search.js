Vue.component('search', {
  data() {
    return {
      searchValue: ''
    }
  },
  template: `
    <input 
      type="text" 
      name="search" 
      class="header-search" 
      placeholder="Поиск по товарам" 
      v-model="searchValue" 
      @input="$root.$refs.products.filterGoods(searchValue)"
    >
  `
});
