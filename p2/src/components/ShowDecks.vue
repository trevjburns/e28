<template>
  <div id="show-decks">
    <h2>Available Decks</h2>
    <!--<show-featured v-bind:category="'snacks'"></show-featured>-->
    <div
      v-for="deck in decks"
      v-bind:key="deck.name"
      
    >
    <a :href="'/deck/' + deck.name">
    <div class="deck-name">
    <span>{{ deck.name }}</span>
    </div>
    </a>
 
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Array,
      default: null,
    },
    decks: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    cardDecks() {
      return [];
    },
  },
};
</script>

<style scoped>
a div {
  height: 2em;
  width: 8em;
  margin: 0 auto;
  border-radius: 5px;
  background-color: lightblue;
  text-align: center;
  margin-bottom: 1em;
  vertical-align: middle;
}

a div span {
    display: inline-block;
    vertical-align: middle;
    line-height: 2em;
    font-size: 1em;
}

a div:hover {
    background-color: lightskyblue;
}

a {
    text-decoration: none;
}

a:link {
  color: black;
}

a:visited {
  color: black;
}

a:hover {
  color: black;
}

a:active {
  color: black;
}

.deck-name {
    font-size: 2em;
    text-transform: uppercase;
}
</style>