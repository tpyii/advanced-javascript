Vue.component('search', {
  template: `
    <input 
      type="text" 
      name="search" 
      class="header-search" 
      placeholder="Поиск по товарам" 
      v-model="$root.searchValue" 
      @input="$root.filterGoods()"
    >
  `
});
