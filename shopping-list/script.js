const ShoppingList = {
    data() {
        return {
            items: [],
            currentItem: {
                item: null,
                qty: null
            },
        }
    },
    methods: {
        addItem() {
            this.items.push({item: this.currentItem.item, qty: this.currentItem.qty});
            this.currentItem.item = null;
            this.currentItem.qty = null;
        },
        removeItem(index) {
            this.items.splice(index, 1);
        }

    }
}

const app = Vue.createApp(ShoppingList).mount('#app');