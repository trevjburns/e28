<template>
  <div id="product-page">
    <div v-if="product">
      <h1 v-if="product">Product: {{ product.name }}</h1>
      <img
      class="thumb"
      :src="require(`@/assets/images/products/${product.id}.jpg`)"
    />

    <div class="price">${{ product.price }}</div>
    <p class="description">{{ product.description }}</p>
    </div>
    <div v-else>
      <h1>Product Not Found</h1>
      <a href='../products'>Back to products page</a>
    </div>
  </div>
</template>

<script>
import { products } from "@/common/products.js";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      products: products,
    };
  },
  computed: {
    product() {
      return this.products.find((product) => product.id == this.id);
    },
  },
};
</script>

<style>
</style>