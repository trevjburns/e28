import { createStore, createLogger } from 'vuex'
import { axios } from '@/common/app.js'

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    state() {
        return {
            user: null
        }
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        }
    },
    actions: {
        authUser(context) {
            return new Promise((resolve) => {
                axios.post('auth').then((response) => {
                    if (response.data.authenticated) {
                        context.commit('setUser', response.data.user);
                    } else {
                        context.commit('setUser', false);
                    }
                    resolve();
                });
            });
        },
    },
    getters: {    
        getProductById(state) {
            return function (id) {
                return state.products.filter((product) => {
                    return product.id == id;
                }, id)[0];
            }
        }
    }
})

// this.$store.commit('setCartCount', cart.count());

// computed: {
//     cartCount() {
//         return this.$store.state.cartCount;
//     }
// }


// on mounted:
// this.$store.dispatch('fetchProducts');

// this.$store.getters.getProductById():

// this.$store.dispatch('authUser');