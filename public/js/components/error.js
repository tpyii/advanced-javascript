Vue.component('error', {
  data() {
    return {
      text: ''
    }
  },
  computed: {
    isVisible() {
      return this.text !== '';
    }
  },
  template: `
    <div class="error" v-bind:class="{ show: isVisible }">
      {{ text }} 
      <button class="btn-close" @click="text=''">X</button>
    </div>
  `
});
