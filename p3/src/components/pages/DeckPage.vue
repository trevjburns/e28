<template>
  <div>
    <h2 class="deck-name">{{ name }}</h2>
    <div class="flashcard" v-if="currentCard">
      <div class="flashcard-header">
        <h2>Card {{ cardNumber }} / {{ totalCards }}</h2>
      </div>
      <div class="flashcard-body">
        <h3>{{ currentCard.question }}</h3>
        <input type="text" id="card-input" v-model="answerInput" data-test="card-input" />
        <button id="card-input-button" v-on:click="submitAnswer" data-test="card-submit">Submit</button>
        <div
          v-if="showFeedback"
          id="feedback"
          v-bind:class="{ pass: correct, fail: !correct }"
        >
          <div v-if="correct" >
            <span data-test="positive-feedback">Correct! Nice job!</span>
            <button v-on:click="getNextCard" data-test="next-card">Next Card</button>
          </div>
          <div v-else><span data-test="negative-feedback">Not quite... try again!</span></div>
        </div>
        <span v-if="showHint" id="hint"></span>
        
      </div>
      <div class="flashcard-footer">
          <hr />
        <button>Show Hint</button>
        <button>Skip Card</button>
      </div>
    </div>
    <div v-else id="no-cards">
        <h3>No cards!</h3>
        <p>Visit the 'Add' page to assign cards to this deck!</p>
        <a href='/deck/add'>Add Cards</a>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";
export default {
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      flashcards: [],
      currentCardId: -1,
      showHint: false,
      correct: false,
      showFeedback: false,
      answerInput: "",
      noCards: false
    };
  },
  computed: {
    thisDeck() {
      return this.flashcards.filter((card) => {
        return card.decks.includes(this.name);
      }, this.name);
    },
    currentCard() {
      if (this.currentCardId) {
        console.log(this.currentCardId);
        let selectedCard = null;
        this.thisDeck.every((card) => {
          if (card.id === this.currentCardId) {
            selectedCard = card;
            return false;
          }
          return true;
        });
        return selectedCard;
      } else {
        return null;
      }
    },
    totalCards() {
      return this.thisDeck.length;
    },
    cardNumber() {
      for (let i = 0; i < this.thisDeck.length; i++) {
        if (this.currentCardId === this.thisDeck[i].id) {
          return i + 1;
        }
      }
      return 0;
    },
  },
  methods: {
    updateCard() {
      this.correct = false;
      this.showFeedback = false;
      this.showHint = false;
      this.answerInput = "";

      let selectedCard = null;
      this.thisDeck.every((card) => {
        if (card.id === this.currentCardId) {
          selectedCard = card;
          return false;
        }
        return true;
      });
      this.currentCard = selectedCard;
    },
    submitAnswer() {
      console.log('submitting answer');
      if (this.answerInput.toLowerCase() == this.currentCard.answer.toLowerCase()) {
        this.correct = true;
        this.showFeedback = true;
      } else {
        this.correct = false;
        this.showFeedback = true;
      }
    },
    getNextCard() {
        // TODO: Set thisDeck element to correct or not
        // TODO: if first time getting it correct, give points
        console.log(this.thisDeck)

      for (let i = 0; i < this.thisDeck.length; i++) {
        if (this.currentCardId === this.thisDeck[i].id) {
            this.thisDeck[i].correct = this.correct
          if (i === this.thisDeck.length - 1) {
            this.currentCardId = this.thisDeck[0].id;
          } else {
            this.currentCardId = this.thisDeck[i + 1].id;
          }
          break;
        }
      }
      this.updateCard();
    },
  },
  mounted() {
    axios.get("flashcard").then((response) => {
      this.flashcards = response.data.flashcard;

      // get first card
      this.flashcards.every((card) => {
        if (card.decks.includes(this.name)) {
          this.currentCardId = card.id;
          this.cardLoaded = true;
          return false;
        }
        return true;
      });
    });
  },
};
</script>

<style scoped>
.pass {
  background-color: green;
}
.fail {
  background-color: red;
}
#feedback {
  display: block;
  padding: 5px;
  margin: 10px 0;
  color: white;
  font-weight: bold;
}
.deck-name {
    padding-top: 1em;
    text-transform: uppercase;
}
#no-cards {
    text-align: center;
}
</style>
