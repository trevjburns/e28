<template>
  <div>
    <div id="deck-form">
      <div class="flashcard">
        <div class="flashcard-header">
          <h2>Add New Deck</h2>
        </div>
        <div class="flashcard-body">
          <div class="input-row">
            <label>Deck Name:</label>
            <input type="text" v-model="newDeck.name" />
          </div>
        </div>
        <div class="flashcard-footer">
          <button v-on:click="submitNewDeck">Submit</button>
          {{ deckErrors }}
           <div v-if="showDeckConfirmation">
              New deck added!
          </div>
        </div>
      </div>
    </div>

    <div id="card-form">
      <div class="flashcard">
        <div class="flashcard-header">
          <h2>Add New Card</h2>
        </div>

        <div class="flashcard-body">
          <div class="input-row">
            <label>Assign to Deck:</label>
            <select id="deckSelect">
              <option value="0" selected disabled>Select Deck</option>
              <option v-for="deck in decks" v-bind:key="deck.name">
                {{ deck.name }}
              </option>
            </select>
          </div>
          <div class="input-row">
            <label>Card Question:</label>
            <input type="text" v-model="newCard.question" />
          </div>
          <div class="input-row">
            <label>Card Answer:</label>
            <input type="text" v-model="newCard.answer" />
          </div>
          <div class="input-row">
            <label>Card Hint:</label>
            <input type="text" v-model="newCard.hint" />
          </div>
          <div class="input-row">
            <label>Point Value:</label>
            <input
              type="number"
              min="0"
              max="100"
              v-model="newCard.point_value"
            />
          </div>
        </div>

        <div class="flashcard-footer">
          <button v-on:click="submitNewCard">Submit</button>
          {{ cardErrors }}
          <div v-if="showCardConfirmation">
              New card added!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      newDeck: {
        name: "",
      },
      newCard: {
        question: "",
        answer: "",
        point_value: 0,
        hint: "",
        completed: false,
        decks: "",
      },
      decks: [],
      deckErrors: null,
      cardErrors: null,
      showCardConfirmation: false,
      showDeckConfirmation: false
    };
  },
  methods: {
    loadDecks() {
      axios.get("deck").then((response) => {
        this.decks = response.data.deck;
      });
    },
    submitNewDeck() {
      axios.post("/deck", this.newDeck).then((response) => {
        if (response.data.errors) {
          this.deckErrors = response.data.errors;
        } else {
          this.showDeckConfirmation = true;
          this.$emit("update-decks");
          this.loadDecks();
        }
      });
    },
    submitNewCard() {
      let deckSelect = document.getElementById("deckSelect");
      let deckInput = deckSelect.value;
      console.log(deckInput);

      if (deckInput == 0) {
        alert("Please select a deck");
        return;
      }

      this.newCard.decks = deckInput;

      axios.post("/flashcard", this.newCard).then((response) => {
        if (response.data.errors) {
          this.cardErrors = response.data.errors;
        } else {
          this.showCardConfirmation = true;
          this.$emit("update-flashcards");
        }
      });
    },
  },
  mounted() {
    axios.get("deck").then((response) => {
      this.decks = response.data.deck;
    });
  },
};
</script>

<style scoped>
.input-row label {
  display: inline-block;
  width: 25%;
  text-align: right;
}
.input-row input {
  display: inline-block;
  width: 40%;
}
.input-row select {
  display: inline-block;
  width: 40%;
}
</style>