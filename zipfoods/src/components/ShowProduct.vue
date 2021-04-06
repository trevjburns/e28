<template>
  <div class="show-product">
    <a :href="'/product/' + product.id">
      <div class="name">{{ product.name }}</div>

      <img
        class="thumb"
        :src="require(`@/assets/images/products/${product.id}.jpg`)"
      />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
};
</script>

<style scoped>
.show-product {
  border: 1px solid var(--silver);
  text-align: center;
  padding: 15px;
  margin: 15px;
  width: 30%;
  min-width: 300px;
}

.name {
  height: 50px;
  font-size: 2rem;
  margin: 5px 0 10px 0;
  vertical-align: baseline;
}

.thumb {
  width: 75%;
  max-width: 300px;
  border-radius: var(--radius);
}

.description {
  margin: auto;
  text-align: left;
  font-style: italic;
  line-height: 1.5;
}

.price {
  font-family: var(--serif-font);
  font-weight: bold;
  font-size: 2rem;
  padding: 10px;
}

.show-product a {
  text-decoration: none;
  color: black;
}
</style>