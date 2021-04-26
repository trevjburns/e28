<template>
  <!-- <img alt="logo" id="logo" src="@/assets/images/zipfoods-logo.png" /> -->

  <nav>
    <h1>FlashCard Trivia</h1>
    <ul class="navigation">
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

  <router-view v-bind:cards="flashcards" v-bind:decks="decks" v-on:update-flashcards='loadCards' v-on:update-decks='loadDecks'></router-view>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
  name: "App",
  components: {},
  data() {
    return {
      flashcards: [],
      decks: [],
      links: ["home", "add"],
      paths: {
        home: "/",
        add: "/deck/add",
      },
    };
  },
  mounted() {
    this.loadCards()
    this.loadDecks()
  },
  methods: {
    loadCards() {
      axios.get("flashcard").then((response) => {
        this.flashcards = response.data.flashcard;
        console.log(this.flashcards);
      });
    },
    loadDecks() {
      axios.get("deck").then((response) => {
        this.decks = response.data.deck;
        console.log(this.decks);
      });
    },
  },
};
</script>

<style src="@/assets/css/styles.css"></style>
