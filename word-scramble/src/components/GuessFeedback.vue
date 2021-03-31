<template>
    <div v-if="feedback" class="feedback" v-bind:class="{ pass: correct, fail: !correct }">
        <div v-if="correct">Correct! Nice job! <button v-on:click="$emit('restart-game')">Play again!</button></div>
        <div v-else>Not quite... try again!</div>
    </div>
</template>

<script>

     export default {
        name: 'GuessFeedback',
        props: {
            feedback: {
                type: Boolean
            },
            correct: {
                type: Boolean
            }
        },
        data() {
            return {};
        },
    };

</script>

<style>
    .pass {
        background-color: green;
    }
    .fail {
        background-color: red;
    }
    .feedback {
        display: inline-block;
        padding: 5px;
        margin: 10px 0;
        color: white;
        font-weight: bold;
    }
</style>