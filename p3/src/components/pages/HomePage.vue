<template>
  <div>
    <show-decks v-bind:cards='flashcards' v-bind:decks='decks'></show-decks>
  </div>
</template>

<script>
import ShowDecks from '@/components/ShowDecks.vue';
export default {
    components: {
        "show-decks": ShowDecks
    },
    props: {
        flashcards: {
            type: Array,
            default: null
        },
        decks: {
            type: Array,
            default: null
        },
    },
};
</script>

<style scoped>
</style>