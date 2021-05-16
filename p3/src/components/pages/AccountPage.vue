<template>
    <div id="account-page">
        <div v-if="user">
            <h2>Hi, {{ user.name }}!</h2>

            <!-- <div id="favorites">
                <strong>Your Favorites</strong>
                <p v-if="favorites && favorites.length == 0">
                    No favorites yet.
                </p>
                <li v-for="(favorite, key) in favorites" v-bind:key="key">
                    {{ favorite.name }}
                </li>
            </div> -->

            <button v-on:click="logout">Logout</button>
        </div>
        <div v-else>
            <div v-if="showLoginForm" id="loginForm">
                
                <h2>Login</h2>
                <small>Don't have a login? <button @click="showLoginForm=false">Register</button></small>
                <div>
                    <label>
                        Email:
                        <input type="text" v-model="data.email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" v-model="data.password" />
                    </label>
                </div>

                <button v-on:click="login">Login</button>

                <ul v-if="errors">
                    <li class="error" v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div v-else id="registerForm">
                <h2>Register</h2>
                <small>Already registered? <button @click="showLoginForm=true">Login</button></small>
                <div>
                    <label>
                        Name:
                        <input type="text" v-model="registrationData.name" />
                    </label>
                </div>
                <div>
                    <label>
                        Email:
                        <input type="text" v-model="registrationData.email" />
                    </label>
                </div>
                <div>
                    <label>
                        Password:
                        <input type="password" v-model="registrationData.password" />
                    </label>
                </div>

                <button v-on:click="register">Register</button>

                <ul v-if="errors">
                    <li class="error" v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { axios } from "@/common/app.js";
export default {
    data() {
        return {
            // Form is prefilled for demonstration purposes; remove in final application
            // jill@harvard.edu/asdfasdf is one of our seed users from e28api/seeds/user.json
            data: {
                email: "jill@harvard.edu",
                password: "asdfasdf",
            },
            registrationData: {
                name: "",
                email: "",
                password: ""
            },
            errors: null,
            favorites: [],
            showLoginForm: true
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        login() {
            axios.post("login", this.data).then((response) => {
                console.log(response);
                if (response.data.authenticated) {
                    this.$store.commit("setUser", response.data.user);
                } else {
                    this.errors = response.data.errors;
                }
            });
        },
        logout() {
            axios.post("logout").then((response) => {
                if (response.data.success) {
                    this.$store.commit("setUser", false);
                }
            });
        },
        register() {
            axios.post("register", this.registrationData).then((response) => {
                console.log(response);

                if (response.data.success) {
                    this.data.email = this.registrationData.email;
                    this.data.password = this.registrationData.password;

                    axios.post("login", this.data).then((response) => {
                        if (response.data.authenticated) {
                            this.$store.commit("setUser", response.data.user);
                        } else {
                            this.errors = response.data.errors;
                        }
                    });
                } else {
                    this.errors = response.data.errors;
                }

                
            });
        },
    },
    watch: {
        user() {
            // this.loadFavorites();
        },
    },
    mounted() {
        // this.loadFavorites();
    },
};
</script>