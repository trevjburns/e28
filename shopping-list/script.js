const ShoppingList = {
    data() {
        return {
            items: [],
            currentItem: null,
        }
    },
    methods: {
        addItem() {
            this.items.push(this.currentItem);
        },

    }
}

const app = Vue.createApp(ShoppingList).mount('#app');