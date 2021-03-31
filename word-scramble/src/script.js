import { createApp } from 'vue'
import GuessFeedback from './components/GuessFeedback.vue'

const App = {
    data() {
        return {
            playerName: '',
            gameStarted: false,
            feedback: false,
            correct: false,
            guessInput: '',
            mysteryWord: {},
            words: [
                {
                    word: "strawberry",
                    hint: "A fruit commonly used in desserts"
                },
                {
                    word: "racoon",
                    hint: "Medium-sized mammal native to North America"
                },
                {
                    word: "fahrenheit",
                    hint: "Temperature scale first proposed in 1724"
                },
                {
                    word: "dinosaur",
                    hint: "A type of reptile from millions of years ago"
                },
                {
                    word: "elevator",
                    hint: "A vertical transportation machine"
                },
            ],
        }
    },
    methods: {
        startGame() {
            this.mysteryWord = this.selectRandomWord();
            this.gameStarted = true;
        },
        selectRandomWord() {
            let randomIndex = Math.floor(Math.random() * Math.floor(this.words.length));
            console.log(randomIndex);
            console.log(this.words[randomIndex]);
            return this.words[randomIndex];
        },
        restartGame() {
            this.feedback = false;
            this.correct = false;
            this.guessInput = '';
            this.mysteryWord = this.selectRandomWord();
        },
        submitGuess() {
            this.correct = this.guessInput.toLowerCase() == this.mysteryWord.word;
            this.feedback = true;
        }
    },
    computed: {
        scrambledWord() {
            let stringArray = this.mysteryWord.word.split("");
            for (let i = stringArray.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                let tmp = stringArray[i];
                stringArray[i] = stringArray[j];
                stringArray[j] = tmp;
            }
            return stringArray.join("");
        }
    }
}

const app = createApp(App);
app.component('guess-feedback', GuessFeedback);
app.mount('#app');