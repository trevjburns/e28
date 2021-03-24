const Game = {
    data() {
        return {
           numbers: [
               { number: 1, wasSelected: false },
               { number: 2, wasSelected: false },
               { number: 3, wasSelected: false },
               { number: 4, wasSelected: false },
               { number: 5, wasSelected: false },
               { number: 6, wasSelected: false },
               { number: 7, wasSelected: false },
               { number: 8, wasSelected: false },
               { number: 9, wasSelected: false },
               { number: 10, wasSelected: false },
           ],
           generatedNumber: -1,
           gameActive: false,
           guessHistory: [],
           playButtonText: "Play!",
           outputText: "",
           gameCompleted: false
        }
    },
    methods: {
        selectNumber(number) {
            
            this.numbers[number-1].wasSelected = true;

            if (number === this.generatedNumber) {
                this.playButtonText = "Correct!";
                let guessedNumbers = this.numbers.filter(numberObj => numberObj.wasSelected);
                let guesses = guessedNumbers.length;

                if (guesses > 1) {
                    this.outputText = `You got it! It only took you ${guesses} guesses!`;
                } else {
                    this.outputText = `Wow! You guessed it on the first try!`;
                }

                this.gameCompleted = true;
                let historyItem = { attemptNumber: (this.guessHistory.length + 1), timesGuessed: guesses };
                this.guessHistory.push(historyItem);
            } else {
                if (number > this.generatedNumber) {
                    this.playButtonText = "Guess lower...";
                } else {
                    this.playButtonText = "Guess higher...";
                }
            }
        },
        playGame() {
            if (!this.gameActive) {
                this.gameActive = true;
                this.generatedNumber = Math.floor(Math.random() * (this.numbers.length - 1) + 1);
                this.playButtonText = "Guess a number...";
            }
        },
        updatePlayText(text) {
            this.playButtonText = text;
        },
        restartGame() {
            this.numbers.forEach(numberObj => numberObj.wasSelected = false);
            this.gameCompleted = false;
            this.outputText = "";
            this.playButtonText = "Guess a number...";
            this.generatedNumber = Math.floor(Math.random() * (this.numbers.length - 1) + 1);
        },
        clearHistory() {
            this.guessHistory = [];
        }
    }
}

const GuessButton = {
    name: 'GuessButton',
    props: {
        number: {
            type: Number,
        },
        wasSelected: {
            type: Boolean,
            default: false
        }
    },
    template: '#guess-button'
}

const PlayHistoryItem = {
    name: 'PlayHistoryItem',
    props: {
        attemptNumber: {
            type: Number
        },
        timesGuessed: {
            type: Number
        }
    },
    template: '#play-history-item'
}

const app = Vue.createApp(Game);
app.component('guess-button', GuessButton);
app.component('play-history-item', PlayHistoryItem);
app.mount('#app');