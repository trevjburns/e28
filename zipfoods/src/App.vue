<template>
  <img alt="ZipFoods logo" id="logo" src="@/assets/images/zipfoods-logo.png" />

  <nav>
    <ul>
      <li>
        <router-link
          v-for="link in links"
          v-bind:key="link"
          v-bind:to="paths[link]"
          exact
        >{{ link }}
        </router-link>
      </li>
    </ul>
  </nav>

<router-view></router-view>

</template>

<script>
import { products } from "@/common/products.js";

export default {
  name: "App",
  components: {
  },
  data() {
    return {
      products: products,

      links: ["home", "products", "categories"],
      paths: {
        home: "/",
        products: "/products",
        categories: "/categories",
      }
      
    };
  },
};
</script>

<style src="@/assets/css/zipfoods.css"></style>

<style>
</style>
