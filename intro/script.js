const Game = {
    data() {
        return {
            playerName: '',
            mysteryNumber: 4,
            guess: null,
            guesses: [],
            correct: false,
            gameActive: false,
        }
    },
    methods: {
        startGame() {
            this.gameActive = true;
        },
        addGuess() {
            this.guesses.push(this.guess);
            this.correct = this.guess == this.mysteryNumber;
        },
        restartGame() {
            this.guesses = [];
            this.guess = null;
            this.correct = false;
            this.mysteryNumber = Math.floor(Math.random()*10);
            this.playerName = '';
            this.gameActive = false; 
        }
    }
}

const app = Vue.createApp(Game).mount('#app');